const mongoose = require('mongoose');

db().catch(err => console.log(err));

async function db() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("connected with db");
}

module.exports = db;