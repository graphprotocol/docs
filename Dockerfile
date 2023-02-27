FROM node:16.13.1-alpine3.14 as builder

RUN apk add --no-cache git

WORKDIR /app

# copy package and lock files first for better caching
COPY ./package.json /app/package.json
COPY ./pnpm-lock.yaml /app/pnpm-lock.yaml

# install the packages
RUN pnpm install --frozen-lockfile --ignore-scripts

# copy the rest
COPY . .

RUN pnpm build
RUN pnpm export

## production environment
FROM nginx:1.16.0-alpine

COPY --from=builder ./app/nginx.conf /etc/nginx/
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
