# Vwin-uploader

File upload to server

## Getting Started

This project proposal is upload a APK, JSON file use UI.


### Prerequisites

Now in Current version not used DB, just use json file instead of DB.
So we don't need to other specific package except nodejs and typescript

* nodejs
* typescript

### Installing

Install node_modules

```
$ npm install
```


## Running the development

```bash
$ npm run start:dev
# or yarn
$ yarn start:dev
```

## Running the tests

This testing code are worte by `jest` frameowork.

And for API testing used `supertest` package.

And this testing codes are only covered API Level unit test.

```bash
$ npm test
# or yarn
$ yarn test
```

Develop testing mode

```bash
$ npm test -- --watch
# or yarn
$ yarn test --watch
```

### And coding style tests

Follow `tslint:recommended` lint styles

```bash
$ npm run lint
# or
$ npm run lint --fix # automatically fixing lint error
# or yarn
$ yarn lint
```

## Deployment

Add additional notes about how to deploy this on a live system
First of all. do run `build` command for compiled to js from ts

```bash
$ npm run build # compiled js file are located in /dist folder
# or yarn
$ yarn build # compiled js file are located in /dist folder
```

And Second. do run `start` command for running web server.

```bash
$ npm start
# or yarn
$ yarn start
```

After finish that job, you can access http://localhost:3000


## Folde Structure

```bash
. 
|- env # environments
|- spec # included testing code
|- dist # compiled js file folder
|- src # source codes
   |- daos # definition a functions for communicate between database and object
   |- entities # model definition
   |- public # public folder used in express
   |- routes
   |- shared
   |- views
   |- index.ts
   |- LoadEnv.ts # load environments
   |- server.ts
|- util
   |- build.js # used in build process
|- package.json
|- tsconfig.json
|- tsconfig.prod.json
|- tslint.json
|- nodemon.json
```

## Documentation

API

GET: users/all

POST: users/add

PUT: users/update

DELETE: users/delete/:id

POST: auth/login
GET: auth/logout

GET: upload
POST: upload


GET: register
POST: register
    


## Built With

* [Typescript](https://www.typescriptlang.org/docs/) - The js compile framework used
* [Express](https://expressjs.com/en/api.html) - The web framework used
* [Jest](http://www.dropwizard.io/1.0.2/docs/) - The test framework used
* [ts-jest](http://www.dropwizard.io/1.0.2/docs/) - The typescript test framework used
* [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) - The generate web framework used
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - The generate JWT security token used


## Contributing

TODO

## Versioning

TODO

## Authors

* **Ace pointer** - *Initial work* - [AcePointer](https://github.com/AcePointer/)

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

### TODO

- [] configure dockerizing
