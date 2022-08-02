import http from 'http';
import moment from 'moment';
import passport from 'passport';
import { Server as IOServer } from "socket.io";

import envConfig from './env.config.js';
import MessagesApi from './src/api/messages.api.js';

import { app, sessionMiddleware } from './src/app.js'
import { infoLog } from './src/utils/loggers.utils.js';


const PORT = envConfig.PORT;

const server = http.createServer(app);
const httpServer = server.listen(PORT);

infoLog.info(`Listening ... => ${PORT}`);

const io = new IOServer(httpServer);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
    if (socket.request.user) {
        next();
    } else {
        next(new Error('unauthorized'))
    }
});

io.on('connect', (socket) => {
    const messagesApi = new MessagesApi();

    socket.on('whoami', (cb) => {
        cb(socket.request.user ? socket.request.user : '');
    });
    const getMessagesApi = async () => {
        const msgs = await messagesApi.getAllApi();
        moment.locale('es')
        const parsedDate = msgs.map((msg) => ({ ...msg, createdAt: moment(msg.createdAt).format('LLLL') }));
        socket.emit('server:messages', parsedDate)
    }
    getMessagesApi()
    socket.on('client:newMessage', async (data) => {
        await messagesApi.addApi({ ...data });
        getMessagesApi()
    })
    const session = socket.request.session;

    session.socketId = socket.id;
    session.save();
});

