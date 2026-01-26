FROM node:25-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Копируем Prisma схему
COPY prisma/schema.prisma ./prisma/

# Генерируем Prisma Client сразу
RUN npx prisma generate

# Фиксим Prisma для ESM
RUN echo '{"type": "module"}' > node_modules/@prisma/client/package.json

# Копируем остальной код
COPY . .

# Собираем
RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/cmd/app/index.js"]