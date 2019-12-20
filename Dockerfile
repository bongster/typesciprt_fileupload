FROM node:12-slim

WORKDIR /server

COPY . /server

RUN npm install --unsafe-perm # add --unsafe-perm flag for postinstall

EXPOSE 3000
CMD [ 'npm', 'start' ]
