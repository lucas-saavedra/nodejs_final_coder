
import { Router } from 'express';

const errorRoutes = new Router();

errorRoutes.get('/error', (req, res) => {
    res
        .render('ejs/invalidPath.ejs')
})
errorRoutes.get('/register-error', (req, res) => {
    res
        .render('ejs/register-error.ejs')
})
errorRoutes.get('/login-error', (req, res) => {
    res
        .render('ejs/login-error.ejs')
})
export default errorRoutes
