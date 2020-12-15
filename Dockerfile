FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN cd page && yarn install && yarn build
EXPOSE 8080
CMD ["node", "index.js" ]

