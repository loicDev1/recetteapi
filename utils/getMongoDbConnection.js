const mongoose = require('mongoose')

module.exports.getMongoDbConnection = async () => {
    return mongoose.connect('mongodb+srv://devo21:loicgame@cluster0.edlsf87.mongodb.net/?retryWrites=true&w=majority')
}