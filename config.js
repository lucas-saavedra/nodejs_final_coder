import dotenv from 'dotenv'
import yargs from 'yargs'
dotenv.config();
const args = yargs(process.argv.slice(2))
  .alias({
    m: 'mode'
  })
  .default({
    mode: "fork"
  })
  .argv;

const {
  DB_PASSWORD,
  SECRET,

} = process.env;

const PORT = process.env.PORT || 8080;

const {
  mode
} = args;
const twilio_cfg = {
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN,
  messagingServiceSid: process.env.MS_ID
}

const GMAIL = {
  pass: process.env.GMAIL_PASS
}

export default {
  GMAIL,
  twilio_cfg,
  PORT: PORT,
  MODE: mode,
  DB_PASSWORD,
  SECRET,
}