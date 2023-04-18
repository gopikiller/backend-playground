FROM node:16-alpine3.16
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm ci
COPY . /app
RUN npm run build
CMD node dist/index.js
EXPOSE 80