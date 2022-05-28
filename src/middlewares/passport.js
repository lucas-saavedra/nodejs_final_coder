import passport from 'passport';
import Local from 'passport-local';
import bcrypt from 'bcrypt';
import daos from '../models/daos/index.js';
import transporter from '../services/nodemailer.js';
import ejs from 'ejs'
const adminEmail = 'lucassaavedra50@gmail.com';
const User = new daos.UserDaoMongoDb();
const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use('login', new Local.Strategy(async (username, password, done) => {
    try {
        const user = await User.getByEmail(username);
        if (!user) {
            return done(null, false, { msg: 'User does not exists' });
        }
        if (!isValidPassword(user, password)) {
            return done(null, false, { msg: 'Invalid password' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use('register', new Local.Strategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        try {
            const isUserRegistered = await User.getByEmail(username);
            if (isUserRegistered) {
                return done(null, false, { msg: 'User already registered' });
            }

            const userObj = {
                name: req.body.name,
                age: req.body.age,
                email: username,
                password: createHash(password),
                timestamp: Date.now(),
                avatar_path: req.file.filename,
                phone: req.body.phone,
                adress: req.body.adress,
            }

            const user = await User.createUser(userObj);
            let message = {};
            ejs.renderFile('src/views/profile.ejs', { user }, (err, str) => {
                message = {
                    // Comma separated list of recipients
                    from: "Servidor de node",
                    to: adminEmail,
                    // Subject of the message
                    subject: 'Nuevo registro',
                    // HTML body
                    html: str
                }
                if (err) {
                    console.log(err);
                }
            })
            await transporter.sendMail(message)
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

//serialize
passport.serializeUser((user, done) => {
    done(null, user._id)
})
//deserialize
passport.deserializeUser(async (id, done) => {
    const user = await User.getById(id);
    done(null, user);
})

export default passport;