const express = require('express');
const { v4: uuidv4 } = require('uuid');
//=> Configuración de Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./db');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'http://nombre-base-de-datos.firebaseio.com'
});
console.log('Firebase conectado!');
//=> Fin Configuración de Firebase

//=> Firebase
const db = admin.firestore();

const query = db.collection('users');

const saveUser = async () => {
    let doc = query.doc(uuidv4());
    await doc.create({
        name: 'Francisco',
        age: 32
    });
}
saveUser();
//=> Fin Firebase

const app = express();

app.listen(3001, () => {
    console.log('Server OK')
});