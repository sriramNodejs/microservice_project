FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./


# =========================
# Development
# =========================
FROM base AS development

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]



# =========================
# Production
# =========================
FROM base AS production

RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 3000

CMD ["npm", "start"]
