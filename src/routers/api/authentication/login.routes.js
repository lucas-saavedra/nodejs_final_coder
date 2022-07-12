import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../../utils/config.js';
import passport from '../../../auth/auth.js';

const loginRoutes = express.Router();

loginRoutes.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            { failureMessage: true },
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        return res.status(401).json({
                            error: 'Invalid username or password'
                        })
                    }
                    req.login(
                        user,
                        async (error) => {
                            if (error) return next(error);
                            delete user.passwordHash;
                            const token = jwt.sign({ user }, config.SECRET);

                            return res
                                .cookie("access_token", token, {
                                    httpOnly: true,
                                    secure: false
                                })
                                .json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);


/* loginRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userApi.getUserByUsernameApi(email);

        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'Invalid username or password'
            })
        }
        const userForToken = {
            email: user.email,
            id: user._id,
        }
        const token = jwt.sign(
            userForToken,
            config.SECRET
        );

        res
            .status(200)
            .send({ token, email: user.email, name: user.name });
    } catch (error) {
        res.status(400)
            .send({ error: error.message });
    }
}) */
export default loginRoutes;