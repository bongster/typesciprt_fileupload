import express, { NextFunction } from 'express';
import path from 'path';


import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Session from 'express-session';
import fileUpload from 'express-fileupload';


import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';


/**
 * Security
 */

// serialize user object
passport.serializeUser(function (user, done) {
  done(null, user);
});

// deserialize user object
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
  if (email === 'test@email.com' && password === 'password') {
    console.log('login are succeed');
    return done(null, {
      email,
      password,
    });
  } else {
    return done(null, false, { message: 'Incorrect account information' })
  }
}));

/**
 * Configure
 */
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(Session({ secret: 'secret' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload({}));

const viewsDir = path.join(__dirname, 'views');


/**
 * Middlewares
 */
const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

/**
 * Routing
 */
app
.get('/login', (req: Request, res: Response) => {
  res.sendFile('login.html', { root: viewsDir });
})
.get('/logout', (req: Request, res: Response) => {
  req.logOut();
  res.redirect('/');
})
.get('/regist', (req: Request, res: Response) => {
  res.sendFile('regist.html', { root: viewsDir });
})
.post('/regist', (req: Request, res: Response) => {
  console.log(req.body);
  res.redirect('/login');
})
.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.use(isAuthenticate)
.get('/', isAuthenticate, (req: Request, res: Response) => {
  res.sendFile('main.html', { root: viewsDir });
})
.post('/upload', (req: Request, res: Response) => {
  // TODO: checking two files are comming from client
  // TODO: checking 1 apk, 1 json postfix are exists
  console.log('request upload post method', req.files);
  //res.redirect('/');
})
;


export default app;
