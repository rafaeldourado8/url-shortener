# Usa a imagem do Node (não Nginx) para desenvolvimento
FROM node:18

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o código fonte
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]