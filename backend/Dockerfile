FROM node:22.17-alpine
RUN apk update
RUN apk add iputils-ping
RUN mkdir /opt/app
WORKDIR /opt/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY ./* .
EXPOSE 8080
CMD ["npm", "run", "dev"]
