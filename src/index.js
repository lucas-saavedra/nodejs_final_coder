import app from './app.js'
import config from './utils/config.js';
import { infoLog } from './utils/loggers.js';

const PORT = config.PORT;


app.listen(PORT, () => {
  infoLog.info(`Listening ... => ${PORT}`);
})

