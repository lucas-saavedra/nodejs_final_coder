import passport from 'passport';
import Local from 'passport-local';
import bcrypt from 'bcrypt';
import daos from '../models/daos/index.js';
import transporter from '../services/nodemailer.js';
import client from '../services/twilio.js';
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

            client.messages
                .create({
                    body: 'Your appointment is coming up on July 21 at 3PM',
                    from: 'whatsapp:+14155238886',
                    to: 'whatsapp:+5493456620180'
                })
                .then(message => console.log(message.sid))
                .done();
            /* client.messages
                .create({
                    body: `
                      ${user.name}
                        ${user.email}
                        ${user.adress}
                        ${user.phone}
                  `,
                    messagingServiceSid: 'MG541c60cbcb0095784710994fd895e772',
                    to: user.phone
                })
                .then(message => console.log(message.sid))
                .done();
 */




            let message = {
                // Comma separated list of recipients
                from: "Servidor de node",
                to: adminEmail,
                // Subject of the message
                subject: 'Nuevo registro',
                // HTML body
                html: `
                <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                  ${user.name}
                  </h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Email: ${user.email}
                    </li>
                    <li class="list-group-item">Direccion: ${user.adress}
                    </li>
                    <li class="list-group-item">Telefono: ${user.phone}
                    </li>
                  </ul>
                </div>
              </div>
              `
            }

            const info = await transporter.sendMail(message)
            console.log(info)
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