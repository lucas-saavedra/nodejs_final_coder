import express from 'express';

import passport from '../../../auth/auth.js';
import jwtCookieExtractor from '../../../utils/jwtCookieExtractor.js';
const userRoutes = express.Router();

userRoutes.use('/user', passport.authenticate('jwt'), userRoutes.get(
    '/profile',
    (req, res, next) => {
        const token = jwtCookieExtractor(req);
        res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: false
            })
            .json({
                message: 'You made it to the secure route',
                user: req.user,
                token
            })
    }

));
userRoutes.post('/register', passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
)
export default userRoutes;