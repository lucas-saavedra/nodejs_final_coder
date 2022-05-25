import nodemailer from 'nodemailer';
import config from '../../config.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'lucassaavedra50@gmail.com',
        pass: config.GMAIL.pass
    }
});

export default transporter;