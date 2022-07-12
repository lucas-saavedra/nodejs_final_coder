import express from 'express';
import path from 'path';
import router from './routers/app.routes.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectToMongoDb from './db/config.js';
import config from './utils/config.js';
import passport from './auth/auth.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//public
app.use(express.static(path.resolve("./public")));

//Middlewares
app.use(cookieParser());
app.use(session({
  name: 'my-session',
  secret: config.SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000
  },
  store: MongoStore.create({
    mongoUrl: connectToMongoDb('sessions')
  })

}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.set('views', path.resolve('./src/views'));
app.set('view engine', 'ejs');

app.use('/api', router);

app.use(function (err, req, res, next) {

  res.status(err.status || 500);
  res.json({ error: req.session });
});


export default app;
