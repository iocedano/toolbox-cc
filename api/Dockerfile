FROM node:14-alpine

WORKDIR /opt/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["npm", "start"]