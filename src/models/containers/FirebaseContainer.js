
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import config from '../../config.js';
class FirebaseContainer {
    constructor(coll) {
        this.connectToDb();
        const db = getFirestore();
        this.query = db.collection(coll)
    }
    connectToDb() {

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(config.DB_CONFIG.firebase.credential)
            });
        }
        console.log('Connected to Firestore!');
    }
    async getAll() {
        const docRef = await this.query.get();
        const documents = docRef.docs;
        return documents.map(document => ({
            _id: document.id,
            ...document.data()
        }))
    }
    async getById(id) {
        const docRef = this.query.doc(id);
        const document = await docRef.get();
        if (!document.data() || !docRef) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return { _id: document.id, ...document.data() };
    }
    async insert(element) {
        const docRef = this.query.doc();
        if (!docRef) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        await docRef.create(element);
        return await this.getById(docRef.id)
    }

    async updateById(id, element) {
        const docRef = this.query.doc(id);
        if (!docRef) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        await docRef.update(element);
        return await this.getById(docRef.id);
    }
    async deleteById(id) {
        const docRef = this.query.doc(id);
        const document = await docRef.get()
        if (!document.data()) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return await docRef.delete();
    }

}
export default FirebaseContainer;