FROM node:25-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

RUN echo '{"type": "module"}' > node_modules/@prisma/client/package.json

COPY . .

RUN pnpm run build

EXPOSE 8000

CMD ["node", "dist/cmd/app/index.js"]