import dotenv from 'dotenv'
import yargs from 'yargs'
dotenv.config();
const args = yargs(process.argv.slice(2))
  .alias({
    p: 'port',
    m: 'mode',
    pers: 'persistencia'
  })
  .default({
    port: 8080,
    persistencia: 'mongo'
  })
  .argv;

const {
  DB_PASSWORD,
  SECRET,

} = process.env;

const PORT = args.port || 8080;

const twilio_cfg = {
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN,
  messagingServiceSid: process.env.MS_ID
}

const GMAIL = {
  pass: process.env.GMAIL_PASS
}
const {
  mode,
  persistencia
} = args;
export default {
  persistencia,
  PORT: PORT,
  MODE: mode,
  DB_PASSWORD,
  SECRET,
}