FROM node:22-alpine AS builder

ARG ENVIRONMENT
ARG ORIGIN

ENV ENVIRONMENT=$ENVIRONMENT
ENV ORIGIN=$ORIGIN

ENV PNPM_HOME="/usr/bin"
ENV NODE_OPTIONS="--max_old_space_size=8192"

RUN apk add --no-cache git
RUN npm install -g corepack@latest
RUN corepack enable pnpm

WORKDIR /app

COPY . ./

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:1.16.0-alpine

COPY --from=builder ./app/nginx.conf /etc/nginx/
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
