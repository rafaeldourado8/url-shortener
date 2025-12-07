from pydantic import BaseModel, HttpUrl, field_validator

class URLCreate(BaseModel):
    url: HttpUrl

    @field_validator('url')
    def validate_scheme(cls, v):
        """
        SEGURANÇA: Validação anti-XSS e anti-SSRF básico.
        Garante que a URL comece estritamente com http:// ou https://
        O Pydantic HttpUrl já faz parse, mas convertemos para string para
        garantir que protocolos perigosos como 'javascript:' ou 'file:'
        jamais passem.
        """
        url_str = str(v)
        if not url_str.startswith(('http://', 'https://')):
            raise ValueError('Protocolo inválido. Apenas http:// ou https:// são permitidos.')
        return v

class URLResponse(BaseModel):
    short_url: str
    original_url: str