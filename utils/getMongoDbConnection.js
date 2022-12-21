const mongoose = require('mongoose')

module.exports.getMongoDbConnection = async () => {
    return mongoose.connect(process.env.MONGO_DB_ATLAS_URL)
}