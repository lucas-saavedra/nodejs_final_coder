import firebaseConfig from './db/firebase/firebase.config.js';
const URI = 'mongodb+srv://lucas_saavedra:Dino21%3F%3F@coderhouse-ecommerce.ys3rp.mongodb.net/coderhouse_ecommerce?retryWrites=true&w=majority';

const config = {
  ENV: {
    PORT: process.env.PORT || 8080,
    PERS: process.env.PERS || 'firebase',
  },
  DB_CONFIG: {
    mongodb: {
      uri: URI
    },
    firebase: {
      credential: firebaseConfig,
    }
  }
}
export default config;