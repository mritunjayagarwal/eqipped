const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderIDSchema = new Schema({
    orderID: {type: String}
   
}, {timestamps: true })


module.exports = mongoose.model('Orderid', orderIDSchema);