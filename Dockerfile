FROM node:12-slim

WORKDIR /server

COPY . /server

RUN npm install --no-optional

ENV PATH /server/node_modules/.bin:$PATH

EXPOSE 3000
CMD [ 'npm', 'start' ]
