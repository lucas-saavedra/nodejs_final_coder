import FirebaseContainer from "../../containers/FirebaseContainer.js";

class ProductosFirebaseDao extends FirebaseContainer {
    constructor() {
        super('products');
    }
}
export default ProductosFirebaseDao;