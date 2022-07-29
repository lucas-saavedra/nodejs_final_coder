import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../../../auth/auth.js';
import config from '../../../../env.config.js';
import { sendConfirmationEmail } from '../../../services/nodemailer.js';
import tokenAuth from '../../../middlewares/tokenAuth.middleware.js';

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
    tokenAuth,
    async (req, res, next) => {
        res.json(req.user)
    }
)



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
