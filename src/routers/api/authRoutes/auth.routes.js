import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../../../auth/auth.js';
import isAuth from '../../../middlewares/isAuth.js';
import jwtCookieExtractor from '../../../utils/jwtCookieExtractor.js';
import config from '../../../../env.config.js';
import { sendConfirmationEmail } from '../../../services/nodemailer.js';

const authRoutes = express.Router();

authRoutes.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            {
                failureMessage: true
            },
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        return res.status(401).json({
                            error: 'Invalid username or password',
                        })
                    }
                    req.login(
                        user,
                        async (error) => {
                            if (error) return next(error);
                            delete user.passwordHash;
                            const token = jwt.sign({ user }, config.SECRET);

                            res
                                .cookie("access_token", token, {
                                    httpOnly: true,
                                    secure: false,
                                    maxAge: 600000
                                })
                                .redirect('/api/productos')
                        }
                    )
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next)

    }
);

authRoutes.post(
    '/register',
    async (req, res, next) => {
        passport.authenticate('signup', {
            failureMessage: true
        },
            async (error, user, info) => {
                try {
                    if (error) {
                        return next(error);
                    }
                    req.login(
                        user,
                        async (error) => {
                            if (error) return next(error);
                            delete user.passwordHash;
                            await sendConfirmationEmail(user);
                            const token = jwt.sign({ user }, config.SECRET);
                            res
                                .cookie("access_token", token, {
                                    httpOnly: true,
                                    secure: false,
                                    maxAge: 600000
                                })
                                .json({ success: true })
                        }
                    )
                } catch (error) {
                    return next(error);
                }
            }

        )(req, res, next)

    }
)
/* authRoutes.get('/profile', passport.authenticate('jwt'),
    (req, res, next) => {
        try {
            const token = jwtCookieExtractor(req);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 600000
                })
                .redirect('/api/productos')
        } catch (error) {
            next(error)
        }

    }
); */

authRoutes.get('/logout', async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) next(err);
        res.clearCookie("access_token");
        res.clearCookie("my-session");
        res.redirect('/');
        res.end();
    }
    );
}
)
export default authRoutes;
