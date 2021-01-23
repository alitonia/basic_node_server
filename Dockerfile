FROM node:14-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN cd client/pages && yarn install
EXPOSE 8080
CMD ["node", "index.js" ]