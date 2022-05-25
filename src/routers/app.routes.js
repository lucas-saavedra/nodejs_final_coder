
import apiRoutes from './api/api.routes.js';
import express from 'express';
import auth from '../middlewares/passportAuth.js';
import path from 'path';
import errorRoutes from "./error/error.routes.js";
import errorHandler from '../middlewares/errorHandler.js';
import { warningLogs } from '../middlewares/loggers.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await req.user;
    if (user) {
        return res.redirect('/profile');
    }
    else {
        return res.sendFile(path.resolve("./public", "login.html"));
    }
});

router.get('/register', async (req, res) => {
    return res.sendFile(path.resolve("./public", "register.html"));
})
router.get('/login', async (req, res) => {
    return res.sendFile(path.resolve("./public", "login.html"));
})
router.get('/profile', auth, async (req, res) => {
    const user = await req.user;
    res.render('profile', { user });
});

router.get('/logout', auth, async (req, res) => {
    const user = await req.user;
    req.logOut();
    res.render('logout', { email: user.email });
});
router.use('/api', apiRoutes, errorHandler);
router.use('/', warningLogs, errorRoutes);


export default router;