const { Model } = require('mongoose')
const beautifulUnique = require('mongoose-beautiful-unique-validation')
const restful = require('node-restful')
const mongoose = restful.mongoose

const registerSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    mail: { type: String, require: true },
    phone: { type: String, require: false },
    address: { type: String, require: true },
    number: { type: Number, require: false },
    complement: { type: String, require: false }
})

registerSchema.plugin(beautifulUnique)

module.exports = restful.model('Register', registerSchema)