# FROM node:22-slim
# WORKDIR /app
# # Instala dependências do sistema
# RUN apt update && apt install -y nodejs npm yarn

# EXPOSE 3000

# CMD ["yarn", "run", "dev", "--port", "3000", "-H", "0.0.0.0"]

FROM oven/bun:1-slim

WORKDIR /app

# Atualiza pacotes do sistema e instala o bash
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends bash && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD ["bun", "run", "dev", "--port", "3000", "-H", "0.0.0.0"]