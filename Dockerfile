FROM node:14-alpine
WORKDIR /app
COPY package.json yarn.lock ./
EXPOSE 8080
COPY . .
RUN cd pages && yarn install && yarn build && cd ..
RUN yarn install
CMD ["node", "index.js" ]

