# FROM node:22-alpine

# WORKDIR /app

# # Instala dependências do sistema
# RUN apk update && apk add nodejs npm yarn
# RUN apk add --no-cache libc6-compat

# EXPOSE 4000

# CMD ["yarn", "start", "--port", "4000", "-H", "0.0.0.0"]

FROM oven/bun:alpine

WORKDIR /app

# Instala a compatibilidade de C runtime (necessária no Alpine para algumas libs nativas)
RUN apk add --no-cache libc6-compat bash

EXPOSE 4000

CMD ["bun", "run", "start", "--port", "4000", "-H", "0.0.0.0"]