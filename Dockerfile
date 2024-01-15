FROM node:20-alpine as development-install
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

FROM development-install as development
COPY . .
COPY .env.example .env
RUN npm run build

##

FROM node:20-alpine as production-install
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production

FROM production-install as production
COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]