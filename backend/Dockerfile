FROM node:lts-alpine3.21
RUN apk update
RUN apk add iputils-ping
RUN mkdir /opt/app
WORKDIR /opt/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY ./* .
CMD ["npm", "run", "dev"]
