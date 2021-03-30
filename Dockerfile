FROM node:14-alpine
WORKDIR /app
COPY client pg_database routes index.js yarn.lock package.json ./
RUN yarn install
EXPOSE 8080
CMD ["node", "index.js" ]