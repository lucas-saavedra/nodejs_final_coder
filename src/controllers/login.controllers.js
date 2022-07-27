import ProductsApi from "../api/products.api.js";

class LoginController {
    constructor() {
        this.productApi = new ProductsApi()
    }
    login = async (req, res, next) => {

    }

}
export default LoginController;