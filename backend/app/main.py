from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import router
from app.core.database import engine_master, Base

app = FastAPI(
    title="URL Shortener High-Scale",
    description="Implementação robusta baseada em SOLID e Clean Architecture",
    version="1.0.0"
)

# -----------------------------------------------------------------------------
# SEGURANÇA: Configuração de CORS (Cross-Origin Resource Sharing)
# -----------------------------------------------------------------------------
# Bloqueia qualquer requisição que não venha destes domínios exatos.
# Isso impede que sites maliciosos usem a sessão do usuário para fazer ações.
origins = [
    "http://localhost",               # Frontend local (sem porta, se houver proxy)
    "http://localhost:5173",          # Frontend local (Vite default)
    "http://localhost:80",            # Nginx local
    "https://shorturlv1.online",      # Domínio de Produção
    "https://www.shorturlv1.online"   # Subdomínio www
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Apenas origens da lista acima
    allow_credentials=True,           # Permite cookies/sessões
    allow_methods=["GET", "POST", "OPTIONS"], # Bloqueia DELETE/PUT se não usados
    allow_headers=["*"],              # Permite headers comuns (Content-Type, etc)
)

@app.on_event("startup")
async def startup():
    """
    Cria as tabelas no banco de dados (apenas para desenvolvimento).
    Em produção, use Alembic para migrações controladas.
    """
    async with engine_master.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/health")
async def health_check():
    """Endpoint de health check para o Load Balancer"""
    return {"status": "healthy", "service": "url-shortener"}

app.include_router(router)