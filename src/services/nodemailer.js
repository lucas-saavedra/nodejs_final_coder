import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import envConfig from '../../env.config.js';
import getAdminEmail from './getAdminEmail.js';
import { errorLog } from '../utils/loggers.js';


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: envConfig.GMAIL.authUser,
        pass: envConfig.GMAIL.pass
    }
});

const sendConfirmationEmail = async (user) => {
    let message = {};
    ejs.renderFile('./src/views/email/profileData.ejs', { user }, (err, str) => {
        if (err) throw new Error(err);
        message = {
            // Comma separated list of recipients
            from: "Servidor de node",
            to: 'saav15@hotmail.es',
            // Subject of the message
            subject: 'Nuevo registro',
            // HTML body
            html: str
        }
    })
    await transporter.sendMail(message);
}



const sendOrderConfirmationEmail = async (order) => {

    try {
        const adminEmail = await getAdminEmail();
        let messageToAdmin = {};
        let messageToClient = {};
        ejs.renderFile(path.resolve('./src/views/email/newOrder.ejs'), { order }, (err, str) => {
            if (err) throw new Error(err);
            messageToClient = {
                from: "Servidor de node",
                to: order.email,
                subject: `¡Gracias por su compra! Aqui su detalle`,
                html: str
            }
            messageToAdmin = {
                from: "Servidor de node",
                to: adminEmail,
                subject: `Nuevo compra de ${order.name} => de ${order.email}`,
                html: str
            }
        });
        await transporter.sendMail(messageToAdmin);
        await transporter.sendMail(messageToClient);
    } catch (error) {
        errorLog(error)
    }

}


export {
    sendConfirmationEmail, sendOrderConfirmationEmail
}