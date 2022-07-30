/* 
import { faker } from '@faker-js/faker'; */
import MongoDaoDb from "../mongodb/Mongo.dao.js";

class ProductsDaoDb extends MongoDaoDb {

    constructor(collection, schema) {
        super(collection, schema);
    }

    /* populate = async () => {
        let products = [];
        for (let index = 0; index < 10; index++) {
            const mockProduct = {
                name: faker.commerce.product(),
                details: faker.commerce.productDescription(),
                url: faker.image.technics(),
                code: faker.datatype.uuid(),
                category: faker.hacker.noun(),
                price: faker.commerce.price(),
                stock: faker.random.numeric(2),
            }
            products.push(mockProduct)
        }
        const result = this.model.insertMany(products);
        return result;
    } */
}
export default ProductsDaoDb;