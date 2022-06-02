import nodemailer from 'nodemailer';
import config from '../../config.js';
import ejs from 'ejs';
import path from 'path';
const adminEmail = 'lucassaavedra50@gmail.com';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: adminEmail,
        pass: config.GMAIL.pass
    }
});

const sendConfirmationEmail = async (user) => {
    let message = {};
    ejs.renderFile('./src/views/email/profileData.ejs', { user }, (err, str) => {
        if (err) throw new Error(err);
        message = {
            // Comma separated list of recipients
            from: "Servidor de node",
            to: adminEmail,
            // Subject of the message
            subject: 'Nuevo registro',
            // HTML body
            html: str
        }
    })
    await transporter.sendMail(message);
}
const sendBuyConfirmationEmail = async (products, req) => {
    let message = {};
    products.total = products.map((item) => +item.precio).reduce(((acc, value) => { return acc + value }), 0);
    ejs.renderFile(path.resolve('./src/views/email/productData.ejs'), { products }, (err, str) => {

        if (err) throw new Error(err);
        message = {
            from: "Servidor de node",
            to: adminEmail,
            subject: `Nuevo compra de ${req.user.name} => de ${req.user.email}`,
            html: str
        }
    });
    await transporter.sendMail(message);
}


export {
    sendConfirmationEmail, sendBuyConfirmationEmail
}