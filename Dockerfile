# This is a fallback, node version is defined in .nvmrc and set in infra/values-local.yaml
ARG NODE_VERSION=22.11.0
ARG NGINX_VERSION=1.22.1

FROM --platform=$BUILDPLATFORM node:$NODE_VERSION-slim as node
WORKDIR /app
COPY . .

# Setup Yarn
RUN corepack enable

# TODO: Using yarn build instead of release for now, because of linting failures
RUN yarn install && yarn build

FROM --platform=$BUILDPLATFORM nginx:$NGINX_VERSION as nginx
COPY --from=node /app/dist /usr/share/nginx/html
