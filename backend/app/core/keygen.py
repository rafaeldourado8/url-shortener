from sqids import Sqids

# Gera IDs tipo "8kMx9" (mínimo 5 letras, base62)
sqids = Sqids(
    min_length=5,
    alphabet="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
)

def generate_short_key(db_id: int) -> str:
    return sqids.encode([db_id])