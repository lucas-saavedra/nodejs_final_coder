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

/* io.on("connection", (socket) => {

    console.log("nuevo socket connectado:", socket.id);
    const getMessagesApi = async () => {
        const msgs = await this.messagesAPi.getAllApi();
        socket.emit('server:messages', msgs)
    }
    getMessagesApi()
    socket.on('client:newMessage', async (data) => {
        await this.messagesAPi.addApi({ ...data, email: 'saav15@hotmail.es', type: 'user' });
        const messages = await this.messagesAPi.getAllApi();
        this.io.emit('server:messages', messages);
    })
    socket.on("disconnect", () => {
        console.log(socket.id, "disconnected");
    });
}); */

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
    console.log(`new connection ${socket.id}`);
    socket.on('whoami', (cb) => {
        cb(socket.request.user ? socket.request.user : '');
    });
    const getMessagesApi = async () => {
        const msgs = await messagesApi.getAllApi();
        socket.emit('server:messages', msgs)
    }
    getMessagesApi()
    socket.on('client:newMessage', async (data) => {
        await messagesApi.addApi({ ...data });
        const messages = await messagesApi.getAllApi();
        io.emit('server:messages', messages);
    })
    const session = socket.request.session;
    console.log(`saving sid ${socket.id} in session ${session.id}`);
    session.socketId = socket.id;
    session.save();
});

