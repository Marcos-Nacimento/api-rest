const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/database', { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose;