const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subCategoriesSchema = new Schema({
    parentCategory: {type: String, required: true},
    subCategory: {type: String, required: true},
}, {timestamps: true})

module.exports = mongoose.model('Subcategory', subCategoriesSchema);
