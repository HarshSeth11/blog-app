const mongoose = require('mongoose');

db().catch(err => console.log(err));

async function db() {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("MongoDb is Conneted the Host is : ", connectionInstance.connection.host);
    } catch (error) {
        console.log("MongoDB Connection Failed, ", error);
    }
}

module.exports = db;