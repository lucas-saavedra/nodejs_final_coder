import express from 'express';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'


import getMongoDbUri from './db/mongo/getMongoDbUri.js';
import passport from './auth/auth.js';
import errorMiddleware from './middlewares/error.middleware.js';
import envConfig from './../env.config.js';
import router from './routers/app.routes.js';
import CartsApi from './api/carts.api.js';
import isAuth from './middlewares/isAuth.middleware.js';

export const app = express();
app.use(cors())
app.use(morgan(envConfig.NODE_ENV == 'development' ? 'dev' : 'tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//public
app.use(express.static(path.resolve("./public")));

//Middlewares
app.use(cookieParser());

export const sessionMiddleware = session({
  name: 'my-session',
  secret: envConfig.SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: +envConfig.COOKIE_MAX_AGE
  },
  store: MongoStore.create({
    mongoUrl: getMongoDbUri(envConfig.DATABASE)
  })
})
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
// Template engines
app.set('views', path.resolve('./src/views'));
app.set('view engine', 'ejs');
app.get('/serverconfigs', async (req, res, next) => {
  res.render('pug/layouts/home', { configs: envConfig })
})

app.get('/', async (req, res) => {
  const user = await req.user;
  if (user) {
    return res.redirect('api/productos');
  }
  else {
    return res.sendFile(path.resolve("./public", "login.html"));
  }
})
app.get('/chat/:email?', isAuth, async (req, res) => {
  return res.sendFile(path.resolve("./public", "chat.html"));
})


app.get('/register', async (req, res) => {
  return res.sendFile(path.resolve("./public", "register.html"));
})

app.use('/api', router);
app.use(errorMiddleware);

