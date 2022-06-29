const mongoose = require('mongoose')
const Schema = mongoose.Schema

const couponSchema = new Schema({
    couponName: { type: String, required: true },
})

module.exports = mongoose.model('Coupon', couponSchema);