import express from 'express';
import { login, register } from '../../../controllers/auth/auth.controllers.js';
import passport from '../../../middlewares/passport.js'
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })


const router = express.Router();

router.post('/register',
    upload.single('avatar'),
    passport.authenticate('register', {
        failureRedirect: '/register-error',
        failureFlash: true
    }),
    register
);

router.post('/login',
    passport.authenticate('login', { failureRedirect: '/login-error' }),
    login
);

export default router;