import express from 'express';
import session from 'express-session';
import path from 'path';
import MongoStore from 'connect-mongo';
import dbConfig from './db/config.js'
import passport from './middlewares/passport.js'
import appRoutes from './routers/app.routes.js';
import mongoose from 'mongoose';
import config from '../config.js';
import cluster from 'cluster';
import os from 'os';
import { consoleLogs, errorLogs } from './middlewares/loggers.js';
import { consoleLogger, errorFileLogger } from './logger/index.js';

const clusterMode = config.MODE === 'cluster';
if (clusterMode && cluster.isPrimary) {
  const CORE_NUMBERS = os.cpus().length;
  
  consoleLogger.info('Numero de procesadores => ', CORE_NUMBERS);
  consoleLogger.info('PID Proceso primario=> ', process.pid);

  for (let i = 0; i < CORE_NUMBERS; i++) {
    cluster.fork();
    consoleLogger.info('PID Proceso worker=> ', process.pid);
  }
  cluster.on('exit', (worker) => {
    consoleLogger.info('Worker', worker.process.pid, 'died');
    cluster.fork();
  })
} else {
  const PORT = config.PORT;
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve("./public")));
  app.use(consoleLogs);

  app.use(session({
    name: 'my-session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000
    },
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.connectTo('sessions')
    }),

  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Template engines
  app.set('views', path.resolve('./src/views'));
  app.set('view engine', 'ejs');

  // Routes
  app.use(appRoutes);

  // Middleware errors
  app.use(errorLogs);
  app.listen(PORT, async () => {
    try {
      await mongoose.connect(dbConfig.mongodb.connectTo('users'))
      consoleLogger.info('Connected to DB!');
      consoleLogger.info('Server is up and running on port: ', +PORT);
    } catch (error) {
      errorFileLogger.error(error)
    }
  });
}

