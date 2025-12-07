from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
import os

from app.core.database import get_db, get_read_db
from app.repositories.url_repository import URLRepository
from app.services.url_service import URLService
from app.schemas.url import URLCreate, URLResponse
from app.core.keygen import generate_short_key  # Certifique-se de ter criado este arquivo

router = APIRouter()

# Pega a URL base dos Secrets/Env (ex: https://jsaxac.com.br)
# Se não estiver definida, usa localhost como fallback
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

# -----------------------------------------------------------------------------
# Dependency Injection Factories
# -----------------------------------------------------------------------------

async def get_write_service(db: AsyncSession = Depends(get_db)) -> URLService:
    repo = URLRepository(db)
    return URLService(repo)

async def get_read_service(db: AsyncSession = Depends(get_read_db)) -> URLService:
    repo = URLRepository(db)
    return URLService(repo)

# -----------------------------------------------------------------------------
# Endpoints
# -----------------------------------------------------------------------------

@router.post(
    "/urls",  # Alterado para plural seguindo boas práticas REST
    response_model=URLResponse, 
    status_code=status.HTTP_201_CREATED
)
async def create_short_url(
    item: URLCreate, 
    db: AsyncSession = Depends(get_db)
):
    """
    Cria uma nova URL encurtada com hash curto e bonito (Sqids).
    
    Fluxo:
    1. Persiste a URL original no banco para obter um ID único (Sequencial).
    2. Gera um código Sqids (ex: '8kMx9') baseado nesse ID.
    3. Atualiza o registro no banco com esse código.
    4. Retorna a URL completa com HTTPS.
    """
    try:
        # 1. Instancia o repositório diretamente para ter controle fino da transação
        repo = URLRepository(db)
        
        # 2. Cria apenas com a URL original para gerar o ID
        new_url = await repo.create(str(item.url))
        
        # 3. Gera a chave bonita baseada no ID numérico (ex: ID 55 -> 'a9Xk2')
        code = generate_short_key(new_url.id)
        
        # 4. Atualiza o banco com a chave gerada
        await repo.update_short_key(new_url.id, code)
        
        # 5. Monta a URL final usando o domínio HTTPS configurado
        full_short_url = f"{BASE_URL}/{code}"
        
        return URLResponse(
            short_url=full_short_url,
            original_url=str(item.url)
        )
        
    except Exception as e:
        print(f"Error creating short URL: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Erro ao processar a solicitação."
        )

@router.get("/{short_key}")
async def redirect_to_url(
    short_key: str, 
    service: URLService = Depends(get_read_service)
):
    """
    Redireciona para a URL original.
    """
    # A lógica de leitura permanece a mesma (Cache -> Banco -> 404)
    original_url = await service.get_original_url(short_key)
    
    if original_url:
        # 301 = Permanente (Melhor para SEO e Cache de navegador)
        # 302 = Temporário (Melhor se você precisa contar cliques com precisão absoluta no server)
        return RedirectResponse(url=original_url, status_code=301)
    
    raise HTTPException(status_code=404, detail="URL not found")