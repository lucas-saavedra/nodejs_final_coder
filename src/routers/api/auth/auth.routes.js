import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../../../auth/auth.js';
import config from '../../../../env.config.js';
import { sendConfirmationEmail } from '../../../services/nodemailer.js';
import tokenAuth from '../../../middlewares/tokenAuth.middleware.js';
import isAuth from '../../../middlewares/isAuth.middleware.js';
import { MESSAGES, STATUS } from '../../../utils/constants.utils.js';
import CustomError from '../../../utils/customError.utils.js';

const authRoutes = express.Router();

authRoutes.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            {
                failureMessage: true,
                failureRedirect: '/login-error'
            },
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        return res.redirect('/login-error')
                    }
                    req.login(
                        user,
                        async (error) => {
                            if (error) {
                                return res.redirect('/login-error');
                            }
                            delete user.passwordHash;
                            const token = jwt.sign({ user }, config.SECRET);
                            res
                                .header('auth_token', token)
                                .json({
                                    data: { token }
                                })
                        }
                    )
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next)

    }
);
authRoutes.get(
    '/profile',
    isAuth,
    tokenAuth,
    async (req, res, next) => {
        delete req.user.passwordHash
        res.json(req.user)
    }
)

authRoutes.post(
    '/register',
    async (req, res, next) => {
        passport.authenticate('signup', {
            failureMessage: true,

        },
            async (error, user, info) => {
                try {
                    if (error || !user) {
                        return res.status(409).json(error);
                    }
                    req.login(
                        user,
                        async (error) => {
                            if (error) return next(error);
                            delete user.passwordHash;
                            await sendConfirmationEmail(user);
                            res.json({ user })
                        }
                    )
                } catch (error) {
                    return next(error);
                }
            }

        )(req, res, next)

    }
)


authRoutes.get('/logout', async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("my-session");
        res.redirect('/');
        res.end();
    }
    );
}
)
export default authRoutes;
