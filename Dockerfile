FROM node:12-slim

WORKDIR /server

COPY ./package.json /server/package.json

RUN npm install

COPY . /server

EXPOSE 3000
CMD [ 'npm', 'start' ]
