FROM node:20-alpine as builder

ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT

ENV PNPM_HOME="/usr/bin"

RUN apk add --no-cache git
RUN npm install -g pnpm@9.0.5

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
