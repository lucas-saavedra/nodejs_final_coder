const express = require('express');
const { invalidPathHandler } = require('./utils/middleware')
const app = express();

const apiRoutes = require('./routers/index');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRoutes);
app.all('*', invalidPathHandler);

const connectedServer = app.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`);
});
connectedServer.on('error', (error) => {
    console.log('Error: ', error);
})

