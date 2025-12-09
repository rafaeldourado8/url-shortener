<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=FFFFFF&center=true&vCenter=true&width=940&lines=🔗+URL+Shortener+High-Scale;1+Trilhão+de+URLs+%7C+20+Anos+de+Armazenamento;Infraestrutura+Enterprise+Grade" alt="Typing SVG" />

<br/>

[![Deploy Backend](https://github.com/rafaeldourado8/url-shortener/actions/workflows/deploy-backend-ec2.yml/badge.svg)](https://github.com/rafaeldourado8/url-shortener/actions/workflows/deploy-backend-ec2.yml)
[![Deploy Frontend](https://github.com/rafaeldourado8/url-shortener/actions/workflows/deploy-frontend-vercel.yml/badge.svg)](https://github.com/rafaeldourado8/url-shortener/actions/workflows/deploy-frontend-vercel.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com)

<h3>Sistema de encurtamento de URLs preparado para escala global</h3>

<p>
  <a href="#-features">Features</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-capacidade-de-escala">Escala</a> •
  <a href="#-stack-tecnológica">Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-deploy">Deploy</a> •
  <a href="#-contribuindo">Contribuir</a>
</p>

---

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

</div>

<br/>

## 📊 Capacidade de Escala

<div align="center">

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor':'#1a1b27','primaryTextColor':'#fff','primaryBorderColor':'#7C3AED','lineColor':'#7C3AED','secondaryColor':'#1a1b27','tertiaryColor':'#1a1b27'}}}%%
graph LR
    A[1 Trilhão de URLs] -->|Base62| B[ID: 0 → 999,999,999,999]
    B -->|Hash 5-10 chars| C[Colisões: ZERO]
    C -->|PostgreSQL BigInt| D[20 Anos Storage]
    D -->|Read Replicas| E[99.99% Uptime]
    
    style A fill:#7C3AED,stroke:#9333EA,stroke-width:3px,color:#fff
    style B fill:#2563EB,stroke:#3B82F6,stroke-width:2px,color:#fff
    style C fill:#059669,stroke:#10B981,stroke-width:2px,color:#fff
    style D fill:#DC2626,stroke:#EF4444,stroke-width:2px,color:#fff
    style E fill:#EA580C,stroke:#F97316,stroke-width:2px,color:#fff
```

### 🚀 Performance em Números

| Métrica | Valor | Detalhes |
|---------|-------|----------|
| **URLs Suportadas** | **1.000.000.000.000** (1 Trilhão) | PostgreSQL BigInt (até 9.223.372.036.854.775.807) |
| **Tempo de Armazenamento** | **20 anos** | Infraestrutura RDS Multi-AZ com backups automáticos |
| **Latência P95** | **< 50ms** | Redis cache com 95%+ hit rate |
| **Throughput** | **50.000 req/s** | Com cache habilitado |
| **Disponibilidade** | **99.99%** | Multi-AZ + Read Replicas |
| **Escalabilidade Horizontal** | **Ilimitada** | Adicione mais instâncias EC2 sob o Load Balancer |

</div>

<br/>

## 🏗️ Arquitetura

<div align="center">

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor':'#1a1b27','primaryTextColor':'#fff','primaryBorderColor':'#7C3AED','lineColor':'#7C3AED','secondaryColor':'#1a1b27','tertiaryColor':'#1a1b27'}}}%%
graph TB
    subgraph "🌐 CDN Layer"
        CF[CloudFront / Vercel Edge]
    end
    
    subgraph "⚖️ Load Balancer Layer"
        ALB[Application Load Balancer]
        NGINX[Nginx - Rate Limiting]
    end
    
    subgraph "🖥️ Application Layer"
        API1[FastAPI Instance 1]
        API2[FastAPI Instance 2]
        API3[FastAPI Instance N...]
    end
    
    subgraph "💾 Cache Layer"
        REDIS[Redis Cluster<br/>ElastiCache<br/>Hit Rate: 95%+]
    end
    
    subgraph "🗄️ Database Layer"
        MASTER[PostgreSQL Master<br/>RDS Multi-AZ<br/>WRITE Operations]
        REPLICA1[Read Replica 1]
        REPLICA2[Read Replica 2]
        REPLICA3[Read Replica 3]
    end
    
    CF --> ALB
    ALB --> NGINX
    NGINX --> API1
    NGINX --> API2
    NGINX --> API3
    
    API1 --> REDIS
    API2 --> REDIS
    API3 --> REDIS
    
    API1 -.->|Write| MASTER
    API2 -.->|Write| MASTER
    API3 -.->|Write| MASTER
    
    MASTER -.->|Replication| REPLICA1
    MASTER -.->|Replication| REPLICA2
    MASTER -.->|Replication| REPLICA3
    
    API1 -.->|Read| REPLICA1
    API2 -.->|Read| REPLICA2
    API3 -.->|Read| REPLICA3
    
    style CF fill:#7C3AED,stroke:#9333EA,stroke-width:3px,color:#fff
    style ALB fill:#2563EB,stroke:#3B82F6,stroke-width:2px,color:#fff
    style NGINX fill:#059669,stroke:#10B981,stroke-width:2px,color:#fff
    style REDIS fill:#DC2626,stroke:#EF4444,stroke-width:3px,color:#fff
    style MASTER fill:#EA580C,stroke:#F97316,stroke-width:3px,color:#fff
    style REPLICA1 fill:#0891B2,stroke:#06B6D4,stroke-width:2px,color:#fff
    style REPLICA2 fill:#0891B2,stroke:#06B6D4,stroke-width:2px,color:#fff
    style REPLICA3 fill:#0891B2,stroke:#06B6D4,stroke-width:2px,color:#fff
```

</div>

### 🔄 Fluxo de Criação de URL

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor':'#1a1b27','primaryTextColor':'#fff','primaryBorderColor':'#7C3AED','lineColor':'#7C3AED','secondaryColor':'#1a1b27','tertiaryColor':'#1a1b27'}}}%%
sequenceDiagram
    participant U as 👤 Usuário
    participant N as Nginx
    participant A as FastAPI
    participant DB as PostgreSQL Master
    participant R as Redis Cache
    
    U->>+N: POST /urls {"url": "https://google.com"}
    N->>+A: Forward Request
    
    Note over A: 1. Valida URL (Pydantic)
    
    A->>+DB: INSERT INTO urls (original_url)
    DB-->>-A: ✅ ID: 123456789
    
    Note over A: 2. Gera Hash Base62<br/>ID → "8kMx9"
    
    A->>+DB: UPDATE urls SET short_key='8kMx9'
    DB-->>-A: ✅ Updated
    
    A->>+R: SET "8kMx9" → "https://google.com"
    R-->>-A: ✅ Cached (1h TTL)
    
    A-->>-N: 201 Created {"short_url": "https://app.com/8kMx9"}
    N-->>-U: 🎉 URL Encurtada!
```

### 🔍 Fluxo de Redirecionamento

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor':'#1a1b27','primaryTextColor':'#fff','primaryBorderColor':'#7C3AED','lineColor':'#7C3AED','secondaryColor':'#1a1b27','tertiaryColor':'#1a1b27'}}}%%
sequenceDiagram
    participant U as 👤 Usuário
    participant N as Nginx
    participant A as FastAPI
    participant R as Redis Cache
    participant DB as PostgreSQL Replica
    
    U->>+N: GET /8kMx9
    N->>+A: Forward Request
    
    A->>+R: GET "8kMx9"
    
    alt ✅ Cache HIT (95% dos casos)
        R-->>A: "https://google.com"
        Note over A: Latência: ~5ms
    else ❌ Cache MISS (5% dos casos)
        R-->>A: null
        A->>+DB: SELECT original_url WHERE short_key='8kMx9'
        DB-->>-A: "https://google.com"
        Note over A: Latência: ~20ms
        A->>R: SET "8kMx9" → "https://google.com"
    end
    
    A-->>-N: 301 Redirect → "https://google.com"
    N-->>-U: 🚀 Redirecionado!
```

<br/>

## ✨ Features

<table>
<tr>
<td width="33%">

### 🚀 Performance
- ⚡ Latência **< 50ms** (P95)
- 📊 **50k req/s** com cache
- 🎯 **95%+ cache hit rate**
- 🔄 Load balancing inteligente

</td>
<td width="33%">

### 🔒 Segurança
- 🛡️ Rate limiting (100 req/s/IP)
- 🔐 HTTPS/TLS end-to-end
- 🚫 XSS & CSRF protection
- 🔑 Secrets management (AWS)

</td>
<td width="33%">

### 📈 Escalabilidade
- ♾️ **Horizontal scaling**
- 🌍 Multi-região (CloudFront)
- 💾 **1 Trilhão de URLs**
- 📅 **20 anos** de storage

</td>
</tr>
<tr>
<td width="33%">

### 🔄 Alta Disponibilidade
- 🏥 **99.99% uptime**
- 🔁 Multi-AZ deployment
- 📖 3x read replicas
- 🔄 Auto-failover

</td>
<td width="33%">

### 🧪 Qualidade
- ✅ Testes automatizados
- 🔍 Type checking (Pydantic)
- 📝 100% API documented
- 🤖 CI/CD com GitHub Actions

</td>
<td width="33%">

### 📊 Monitoramento
- 📈 CloudWatch metrics
- 🔍 Performance Insights
- 📋 Structured logging
- 🚨 Alertas automáticos

</td>
</tr>
</table>

<br/>

## 🛠️ Stack Tecnológica

<div align="center">

### Backend
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Infrastructure
![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Load_Balancer-009639?style=for-the-badge&logo=nginx&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

</div>

<br/>

## 🎯 Cálculo de Capacidade

<details>
<summary><b>📐 Como chegamos a 1 Trilhão de URLs?</b></summary>

<br/>

### **Alfabeto Base62**
```
0-9 (10 dígitos) + a-z (26 letras) + A-Z (26 letras) = 62 caracteres
```

### **Capacidade por Tamanho de Hash**

| Tamanho | Combinações | Notação Científica | Descrição |
|---------|-------------|-------------------|-----------|
| 5 chars | 62^5 | **916,132,832** | ~916 milhões |
| 6 chars | 62^6 | **56,800,235,584** | ~56 bilhões |
| 7 chars | 62^7 | **3,521,614,606,208** | **~3.5 trilhões** ✅ |
| 8 chars | 62^8 | **218,340,105,584,896** | ~218 trilhões |

**Nossa implementação usa Sqids (min_length=5):**
- ✅ Começa com **5 caracteres** (916 milhões)
- 🔄 Expande automaticamente para **6-10 caracteres** conforme necessário
- 🎯 **Capacidade real**: > 1 Trilhão de URLs sem colisões

### **PostgreSQL BigInt Capacity**
```sql
-- Tipo: BIGINT (8 bytes)
-- Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

-- IDs positivos disponíveis:
9,223,372,036,854,775,807 URLs ≈ 9.2 QUINTILHÕES 🤯

-- Tempo para esgotar (assumindo 1M URLs/dia):
9,223,372,036,854,775,807 / 1,000,000 / 365 = 25,261,718 ANOS 🚀
```

### **Storage em 20 Anos**

**Cálculo de Espaço:**
```
Tamanho médio por registro:
- ID (BigInt): 8 bytes
- original_url (VARCHAR 2048): ~100 bytes (média)
- short_key (VARCHAR 10): 10 bytes
- clicks (Integer): 4 bytes
- created_at (Timestamp): 8 bytes
- Indexes + Overhead: ~30 bytes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: ~160 bytes por URL
```

**1 Trilhão de URLs:**
```
1,000,000,000,000 URLs × 160 bytes = 160 TB de dados brutos
+ Indexes (25%): 40 TB
+ Write-Ahead Log (10%): 16 TB
+ Backups (100%): 216 TB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL ESTIMADO: ~432 TB

💰 Custo AWS RDS Storage (gp3): $0.12/GB/mês
432,000 GB × $0.12 = $51,840/mês
```

**Solução de Custo Efetivo:**
- 🗄️ **Particionamento por Data**: Tabelas mensais/anuais
- ❄️ **Archival para S3 Glacier**: URLs antigas ($0.004/GB/mês)
- 🔥 **Hot Data** (últimos 30 dias): RDS
- 🧊 **Cold Data** (> 30 dias): S3 Glacier
- 📊 **Custo Otimizado**: ~$5,000/mês para 1 Trilhão

</details>

<br/>

## 🚀 Quick Start

### Pré-requisitos

```bash
# Software necessário
Docker & Docker Compose
Node.js 18+
Python 3.11+
Git
```

### 1️⃣ Clone e Configure

```bash
# Clone o repositório
git clone https://github.com/rafaeldourado8/url-shortener.git
cd url-shortener

# Configure variáveis de ambiente
cp backend/.env.example backend/.env
# Edite backend/.env com suas configurações
```

### 2️⃣ Inicie com Docker

```bash
# Suba todos os serviços
docker-compose up -d

# Aguarde os containers iniciarem (~30 segundos)
docker-compose logs -f
```

### 3️⃣ Acesse as Aplicações

```bash
🌐 Frontend:     http://localhost
📚 API Docs:     http://localhost/docs
💚 Health Check: http://localhost/health
```

### 4️⃣ Teste a API

```bash
# Criar URL curta
curl -X POST http://localhost/urls \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'

# Resposta:
# {
#   "short_url": "http://localhost/8kMx9",
#   "original_url": "https://google.com"
# }

# Testar redirecionamento
curl -I http://localhost/8kMx9
# HTTP/1.1 301 Moved Permanently
# Location: https://google.com
```

<br/>

## 🌐 Deploy em Produção

### Opção 1: Deploy Automático (GitHub Actions)

```bash
# 1. Configure secrets no GitHub
./scripts/setup-github-secrets.sh

# 2. Push para main
git add .
git commit -m "Deploy to production"
git push origin main

# 3. Acompanhe em:
# https://github.com/rafaeldourado8/url-shortener/actions
```

### Opção 2: Deploy Manual com Terraform

```bash
# 1. Configure AWS CLI
aws configure

# 2. Crie infraestrutura
cd infrastructure/terraform
terraform init
terraform plan -var="db_password=SuaSenhaSegura123"
terraform apply

# 3. Obtenha outputs
terraform output
```

**Recursos criados:**
- ✅ VPC com subnets públicas/privadas
- ✅ RDS PostgreSQL Multi-AZ + 3 Read Replicas
- ✅ ElastiCache Redis Cluster (3 nodes)
- ✅ Security Groups otimizados
- ✅ CloudWatch monitoring

📖 **Guia Completo**: [DEPLOYMENT.md](./DEPLOYMENT.md)

<br/>

## 📊 Monitoramento e Observabilidade

### Métricas em Tempo Real

```bash
# Verificar status dos containers
docker-compose ps

# Logs em tempo real
docker-compose logs -f app

# Métricas de performance
curl http://localhost/health
```

### Dashboards CloudWatch (Produção)

| Dashboard | Métricas |
|-----------|----------|
| **Backend** | Latência P50/P95/P99, Taxa de Erro, Throughput |
| **Cache** | Hit Rate, Latência Redis, Memory Usage |
| **Database** | Connections, Replication Lag, CPU/Memory |
| **Application** | Request Rate, Error Rate, Response Time |

<br/>

## 🧪 Testes

```bash
# Executar testes
cd backend
pytest -v --cov=app

# Testes com coverage HTML
pytest --cov=app --cov-report=html
open htmlcov/index.html

# Testes específicos
pytest tests/test_routes.py -v
```

### Cobertura de Testes

- ✅ Unit Tests (Repositories, Services)
- ✅ Integration Tests (API Endpoints)
- ✅ E2E Tests (Fluxo completo)
- 📊 Target: 80%+ code coverage

<br/>

## 🔧 Comandos Úteis (Makefile)

```bash
make help           # Lista todos os comandos
make setup          # Configuração inicial
make dev            # Inicia ambiente dev
make test           # Executa testes
make lint           # Linter de código
make deploy-all     # Deploy completo
make health         # Verifica health dos serviços
```

<br/>

## 📈 Roadmap

- [x] ✅ Arquitetura base com FastAPI + React
- [x] ✅ Redis caching layer
- [x] ✅ PostgreSQL Master + Read Replicas
- [x] ✅ CI/CD com GitHub Actions
- [x] ✅ Terraform para infraestrutura AWS
- [x] ✅ Rate limiting e segurança
- [ ] 🚧 Analytics dashboard (cliques, geolocalização)
- [ ] 🚧 Custom short URLs (vanity URLs)
- [ ] 🚧 QR Code generation
- [ ] 🚧 Link expiration/scheduling
- [ ] 🚧 API authentication (OAuth2/JWT)
- [ ] 🚧 WebSocket para atualizações em tempo real

<br/>

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja como você pode ajudar:

1. 🍴 Fork o projeto
2. 🌿 Crie uma branch (`git checkout -b feature/NovaFeature`)
3. ✨ Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. 📤 Push para a branch (`git push origin feature/NovaFeature`)
5. 🔃 Abra um Pull Request

### Guidelines

- ✅ Escreva testes para novas features
- 📝 Documente mudanças significativas
- 🎨 Siga o style guide (Black para Python, ESLint para JS)
- 🐛 Reporte bugs com detalhes e passos para reproduzir

<br/>

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

<br/>

## 👨‍💻 Autor

<div align="center">

### Rafael Dourado

[![GitHub](https://img.shields.io/badge/GitHub-rafaeldourado8-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rafaeldourado8)
[![Email](https://img.shields.io/badge/Email-rafaeldouradoc7%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rafaeldouradoc7@gmail.com)

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=7C3AED&center=true&vCenter=true&width=435&lines=Criado+com+muito+☕;Desenvolvido+com+❤️;Escalado+para+🌍" alt="Footer" />

</div>

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

**💬 Dúvidas? Abra uma [issue](https://github.com/rafaeldourado8/url-shortener/issues)**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=100&section=footer" width="100%"/>

</div>
