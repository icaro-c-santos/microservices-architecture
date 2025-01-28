# Etapa 1: Construção
FROM node:18 AS builder


WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


CMD ["npmr", "run", "start"]

# Expor a porta da aplicação
EXPOSE 3000
