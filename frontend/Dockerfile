FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Empty = same-origin; nginx proxies /api/* to the api service
ARG API_URL=
ENV API_URL=$API_URL
ENV NODE_ENV=production

RUN npm run build -- --mode production


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80