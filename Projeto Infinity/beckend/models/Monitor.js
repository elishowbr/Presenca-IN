const mongoose = require('mongoose')
const uuid = require('uuid')

const Monitor = mongoose.model('Monitor', {
    name: String,
    email: String,
    password: String,
    cargo: String
})

module.exports = Monitor