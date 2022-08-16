import envConfig from '../../../env.config.js';
const getMongoDbUri = () => {
  return `${envConfig.MONGO_URI}`
}

export default getMongoDbUri