FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn

FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV TEST_SERVER 'http://ae3988b2bb5ec49e7badb4867e7d87e2-1496055706.ca-central-1.elb.amazonaws.com:3000'

RUN yarn build

FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN npm install -g serve

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/build /app


CMD serve -s .