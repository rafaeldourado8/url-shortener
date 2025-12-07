from fastapi import FastAPI
from app.api.v1.endpoints import router
from app.core.database import engine, Base

app = FastAPI(
    title="My URL Shortener",
    description="Implementação robusta baseada em SOLID e Clean Architecture",
    version="1.0.0"
)

@app.on_event("startup")
async def startup():
    # Em produção, use Alembic para migrações. Aqui criamos tabelas para dev.
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(router)