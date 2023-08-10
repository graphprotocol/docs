FROM node:18-alpine as builder

ENV PNPM_HOME="/usr/bin"

RUN apk add --no-cache git
RUN npm install -g pnpm@8.6.2

WORKDIR /app

COPY . .

# install the packages
RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm build
RUN pnpm export

## production environment
FROM nginx:1.24-alpine

COPY --from=builder ./app/nginx.conf /etc/nginx/
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
