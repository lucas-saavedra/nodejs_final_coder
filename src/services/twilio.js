import twilio from 'twilio'
import config from '../../config.js';

const { accountSid, authToken } = config.twilio_cfg;
const client = twilio(accountSid, authToken);

const sendSmsBuyConfirmation = (req, id, total) => {
    client.messages
        .create({
            body: 'Tu pedido con el ID : (' + id + ') ha sido recibido y se encuentra en proceso, total a pagar: $' + total,
            messagingServiceSid: config.twilio_cfg.messagingServiceSid,
            to: `${req.user.phone}`
        })
        .done();
}
const sendWspBuyConfirmation = (req) => {
    client.messages
        .create({
            body: `Nuevo compra de ${req.user.name} => email ${req.user.email}`,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5493456620180'
        })
        .done();
}
export { sendSmsBuyConfirmation, sendWspBuyConfirmation };