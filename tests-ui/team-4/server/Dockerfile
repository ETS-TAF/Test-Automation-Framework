FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn

FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN npm install -g serve

COPY --from=deps /app/node_modules ./node_modules
COPY . .


CMD node api.js