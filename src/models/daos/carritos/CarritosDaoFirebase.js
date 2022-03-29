import FirebaseContainer from "../../containers/FirebaseContainer.js";

class CarritosDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts');
    }
}

export default CarritosDaoFirebase;