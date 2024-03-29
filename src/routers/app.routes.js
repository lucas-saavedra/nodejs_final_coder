import express from 'express';
import pug from 'pug';
import { readFile } from 'fs/promises';
import path from 'path';

import apiRoutes from './api/api.routes.js';
import isAuth from '../middlewares/isAuth.middleware.js';
import isAdminAuth from '../middlewares/isAdminAuth.middleware.js';
import envConfig from '../../env.config.js';
import MessagesApi from '../api/messages.api.js';

const router = express.Router();



router.get('/', async (req, res) => {
    const user = await req.user;
    if (user) {
        return res.redirect('/productos');
    }
    else {
        return res.sendFile(path.resolve("./public", "login.html"));
    }
})
router.get('/register', async (req, res) => {
    return res.sendFile(path.resolve("./public", "register.html"));
})

router.get('/chat', isAuth, async (req, res) => {
    return res.sendFile(path.resolve("./public", "chat.html"));
})
router.get('/chat/?:email', isAuth, isAdminAuth, async (req, res) => {
    return res.sendFile(path.resolve("./public", "chat.html"));
})
router.get('/mensajes', isAuth, async (req, res) => {
    const email = req.user.email;
    const messagesApi = new MessagesApi();
    const messages = await messagesApi.getAllMsgsFromEmailApi({ email })
    res.render('ejs/chat.ejs', { messages, userEmail: email })

})


router.get('/serverconfigs', isAdminAuth, async (req, res, next) => {
    const file = await readFile(path.resolve('src/views/pug/layouts/home.pug'), 'utf-8');
    const render = pug.render(file, { configs: envConfig })
    res.send(render);
})

router.use(apiRoutes);

export default router;