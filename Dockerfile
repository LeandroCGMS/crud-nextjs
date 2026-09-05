FROM node:22-alpine

WORKDIR /app

# Instala dependências do sistema
RUN apk update && apk add nodejs npm yarn
RUN apk add --no-cache libc6-compat

EXPOSE 4000

CMD ["yarn", "start", "--port", "4000", "-H", "0.0.0.0"]