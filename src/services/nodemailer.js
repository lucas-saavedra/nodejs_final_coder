import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import config from '../../env.config.js';


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: config.GMAIL.authUser,
        pass: config.GMAIL.pass
    }
});

const sendConfirmationEmail = async (user) => {
    let message = {};
    ejs.renderFile('./src/views/ejs/email/profileData.ejs', { user }, (err, str) => {
        if (err) throw new Error(err);
        message = {
            // Comma separated list of recipients
            from: "Servidor de node",
            to: config.ADMIN_EMAIL,
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
        let messageToAdmin = {};
        let messageToClient = {};
        const str = await ejs.renderFile(path.resolve('./src/views/ejs/email/newOrder.ejs'), { order })
        messageToClient = {
            from: "Servidor de node",
            to: order.email,
            subject: `¡Gracias por su compra! Aqui su detalle`,
            html: str
        }
        messageToAdmin = {
            from: "Servidor de node",
            to: config.ADMIN_EMAIL,
            subject: `Nuevo compra de ${order.name} => de ${order.email}`,
            html: str
        }
        await transporter.sendMail(messageToAdmin);
        await transporter.sendMail(messageToClient);
    } catch (error) {
        console.log(error)
    }

}


export {
    sendConfirmationEmail, sendOrderConfirmationEmail
}