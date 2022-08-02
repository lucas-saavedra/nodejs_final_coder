import passport from "passport";
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passport_jwt from 'passport-jwt';
import UsersApi from "../api/users.api.js";
import config from "../../env.config.js";


const localStrategy = passportLocal.Strategy;
const JWTstrategy = passport_jwt.Strategy;
const ExtractJwt = passport_jwt.ExtractJwt;

const userApi = new UsersApi();
passport.use(
    new JWTstrategy(
        {
            secretOrKey: config.SECRET,
            jwtFromRequest: ExtractJwt.fromHeader('auth_token')
        },
        async (token, done) => {
            try {
                if (!token.user) {

                    return done(error);
                }
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password'
        },
        async (req, email, password, done) => {
            try {
                const isUserRegistered = await userApi.getUserByUsernameApi(email);
                if (isUserRegistered) {
                    return done(null, false)
                }
                const saltRounds = 10;
                const passwordHash = await bcrypt.hash(password, saltRounds);
                const newUser = {
                    ...req.body,
                    name: req.body.name,
                    email,
                    passwordHash,
                    adress: req.body.adress
                }
                const user = await userApi.createUserApi({ ...newUser });
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {

                const user = await userApi.getUserByUsernameApi(email);

                if (!user) {
                    return done(null, false);
                }
                const validate = await bcrypt.compare(password, user.passwordHash);
                if (!validate) {
                    return done(null, false);
                }
                delete user.passwordHash;
                return done(null, user, { message: 'Logged in successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user._id)
})
//deserialize
passport.deserializeUser(async (id, done) => {
    const user = await userApi.getByIdApi(id);
    done(null, user);
})
export default passport;