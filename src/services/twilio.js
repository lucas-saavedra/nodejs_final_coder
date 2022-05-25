import twilio from 'twilio'
import config from '../../config.js';

const { accountSid, authToken } = config.twilio_cfg;
const client = twilio(accountSid, authToken);

export default client;