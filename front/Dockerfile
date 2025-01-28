# Base image
FROM nginx:alpine

# Define o diretório de trabalho no container
WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão de exemplo do Nginx
RUN rm -rf ./*

# Copia os arquivos HTML e outros recursos estáticos (CSS, JS, imagens)
COPY . .

# Expõe a porta padrão do Nginx
EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
