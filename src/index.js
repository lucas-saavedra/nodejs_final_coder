import express from 'express';
import config from '../config.js';


const PORT = config.PORT;

const app = express();

app.listen(PORT, () => {
    console.log(`Listening ... => ${PORT}`);
})

