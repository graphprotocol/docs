FROM node:16.13.1-alpine3.14 as builder

ARG NEXT_PUBLIC_BASE_PATH

RUN apk add --no-cache git

WORKDIR /app

# copy package and lock files first for better caching
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

# install the packages
RUN yarn install

# copy the rest
COPY . .

RUN yarn build
RUN yarn export

## production environment
FROM nginx:1.16.0-alpine

COPY --from=builder ./app/nginx.conf /etc/nginx/
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
