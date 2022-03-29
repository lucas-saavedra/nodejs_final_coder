import express from 'express';
import invalidPathHandler from './middlewares/pathErrorMiddleware.js'
import router from './routers/index.js';
import config from './config.js';
const PORT = config.ENV.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.all('*', invalidPathHandler);


const connectedServer = app.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`);
});
connectedServer.on('error', (error) => {
    console.log('Error: ', error);
})