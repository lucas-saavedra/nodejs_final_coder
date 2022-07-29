import dotenv from 'dotenv'
import yargs from 'yargs'
import path from 'path'

const ADMIN_EMAIL = 'lucas.saavedra.dev@gmail.com';
const args = yargs(process.argv.slice(2))
  .alias({
    prods_pers: 'products_persistence',
    users_pers: 'users_persistence',
    orders_pers: 'orders_persistence',
    carts_pers: 'carts_persistence',
  })
  .default({
    products_persistence: 'mongo',
    users_persistence: 'mongo',
    orders_persistence: 'mongo',
    carts_persistence: 'mongo',
  })
  .argv;

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(`./.dev.env`)
  });
}

if (NODE_ENV === 'production') {
  dotenv.config({
    path: path.join(`./.prod.env`)
  });
}
const {
  COOKIE_MAX_AGE,
  DB_PASSWORD,
  SECRET,
  DATABASE,
  PORT,
  MONGO_URI
} = process.env;


const GMAIL = {
  pass: process.env.GMAIL_PASS,
  authUser: process.env.GMAIL_USER
}
const {
  products_persistence,
  users_persistence,
  orders_persistence,
  carts_persistence
} = args;

const PERSISTENCE = {
  carts_persistence,
  orders_persistence,
  products_persistence,
  users_persistence,
}

export default {
  ADMIN_EMAIL,
  COOKIE_MAX_AGE,
  MONGO_URI,
  GMAIL,
  PERSISTENCE,
  DATABASE,
  PORT,
  DB_PASSWORD,
  SECRET,
  NODE_ENV
}

