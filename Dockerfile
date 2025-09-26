FROM node:24-alpine3.21 AS builder
EXPOSE 8080
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN yarn build

FROM nginxinc/nginx-unprivileged:alpine3.22-perl AS stager
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html