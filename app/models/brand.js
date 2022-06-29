const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandsSchema = new Schema({
    subCategory: {type: String, required: true},
    imagename: {type: String, required: true},
})

module.exports = mongoose.model('Brand', brandsSchema);