import env from '../../config.js';
export default {
  mongodb: {
    connectTo: (database) => `mongodb+srv://lucas_saavedra:${env.DB_PASSWORD}@coderhouse-ecommerce.ys3rp.mongodb.net/${database}?retryWrites=true&w=majority`,
  }
}