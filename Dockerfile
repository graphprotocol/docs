FROM node:20-alpine as builder

ARG ENVIRONMENT
ARG ORIGIN

ENV ENVIRONMENT=$ENVIRONMENT
ENV ORIGIN=$ORIGIN

ENV PNPM_HOME="/usr/bin"

RUN apk add --no-cache git
RUN npm install -g corepack@latest
RUN corepack enable pnpm

WORKDIR /app

COPY . .

# install the packages
RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm build

## production environment
FROM nginx:1.16.0-alpine

COPY --from=builder ./app/nginx.conf /etc/nginx/
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
