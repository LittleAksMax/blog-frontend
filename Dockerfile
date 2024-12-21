FROM node:alpine3.19 AS builder
EXPOSE 8080
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

# NOTE: will need to add access key and whatever other environment variables somehow
ENV NODE_ENV production
RUN yarn build

FROM nginxinc/nginx-unprivileged:bookworm-perl AS stager
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html