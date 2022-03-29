
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
        admin.initializeApp({
            credential: admin.credential.cert(config.DB_CONFIG.firebase.credential)
        });
        console.log('Connected to Firestore!');
    }
    async getAll() {
        const docRef = await this.query.get();
        const documents = docRef.docs;
        return documents.map(document => ({
            id: document.id,
            ...document.data()
        }))
    }
    async getById(id) {
        const docRef = this.query.doc(id);
        if (!docRef) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        const document = await docRef.get();
        return document.data();
    }
    async insert(element) {
        const docRef = this.query.doc();
        return await docRef.set(element);
    }

    async updateById(id, element) {
        const docRef = this.query.doc(id);
        if (!docRef) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return await docRef.update(element);
    }
    async deleteById(id) {

        const docRef = this.query.doc(id);
        if (!docRef) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return await docRef.delete();
    }

}
export default FirebaseContainer;