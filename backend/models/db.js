const mongoose = require('mongoose');
const conf = require('../conf/conf')

db().catch(err => console.log(err));

async function db() {
    await mongoose.connect(conf.dbConnectionString);
    console.log("connected with db");
}

module.exports = db;