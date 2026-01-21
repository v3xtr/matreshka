FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN npx prisma generate

FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/cmd/app/index.mjs"]
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN npx prisma generate

FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/cmd/app/index.mjs"]
