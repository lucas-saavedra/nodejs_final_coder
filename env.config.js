import dotenv from 'dotenv'
import yargs from 'yargs'
import path from 'path'

const args = yargs(process.argv.slice(2))
  .alias({
    m: 'mode',
    prods_pers: 'products_persistence',
    users_pers: 'users_persistence',
    orders_pers: 'orders_persistence',
  })
  .default({
    mode: 'dev',
    products_persistence: 'mongo',
    users_persistence: 'mongo',
    orders_persistence: 'mongo'
  })
  .argv;
dotenv.config({
  path: path.join(`./.${args.mode}.env`)
});
const {
  COOKIE_MAX_AGE,
  DB_PASSWORD,
  SECRET,
  DATABASE,
  PORT
} = process.env;



const twilio_cfg = {
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN,
  messagingServiceSid: process.env.MS_ID
}

const GMAIL = {
  pass: process.env.GMAIL_PASS,
  authUser: process.env.GMAIL_USER
}
const {
  products_persistence,
  users_persistence,
  orders_persistence,
  mode
} = args;

export default {
  COOKIE_MAX_AGE,
  GMAIL,
  mode,
  orders_persistence,
  products_persistence,
  users_persistence,
  DATABASE,
  PORT,
  DB_PASSWORD,
  SECRET,
}