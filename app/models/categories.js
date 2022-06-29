const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    pcategory: {type: String, required: true},
    pimage: {type: String, required: true},
})

module.exports = mongoose.model('Category', categoriesSchema);