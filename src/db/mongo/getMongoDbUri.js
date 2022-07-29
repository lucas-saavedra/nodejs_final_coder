import envConfig from '../../../env.config.js';
const getMongoDbUri = (database) => {
  return `${envConfig.MONGO_URI}/${database}?retryWrites=true&w=majority`
}

export default getMongoDbUri