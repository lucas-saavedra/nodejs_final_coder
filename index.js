import envConfig from './env.config.js';
import app from './src/app.js'

import { infoLog } from './src/utils/loggers.utils.js';


const PORT = envConfig.PORT;

app.listen(PORT, () => {
  infoLog.info(`Listening ... => ${PORT}`);
})

