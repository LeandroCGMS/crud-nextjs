# FROM node:22-alpine

# WORKDIR /app

# # Instala dependências do sistema
# RUN apk update && apk add nodejs npm yarn
# RUN apk add --no-cache libc6-compat

# EXPOSE 4000

# CMD ["yarn", "start", "--port", "4000", "-H", "0.0.0.0"]

FROM oven/bun:1-alpine

WORKDIR /app

# Atualiza pacotes do sistema e instala bash + dependências de compatibilidade
RUN apk update && apk upgrade && apk add --no-cache bash libc6-compat

EXPOSE 4000

CMD ["bun", "run", "start", "--port", "4000", "-H", "0.0.0.0"]