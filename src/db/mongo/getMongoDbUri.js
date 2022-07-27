import env from '../../../env.config.js';
const getMongoDbUri = (database) => {
  return `mongodb+srv://lucas_saavedra:${env.DB_PASSWORD}@coderhouse-ecommerce.ys3rp.mongodb.net/${database}?retryWrites=true&w=majority`
}

export default getMongoDbUri