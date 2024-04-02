const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri);

async function getConnection(){
    const data = await client.connect();
    const db = data.db('Indira');
    return db.collection('user');
}

module.exports = getConnection;