const Order = require('../../../models/order')
const User = require('../../../models/user')
const Product = require('../../../models/product')

function statusController() {
    return {
        update(req, res) {
            Order.updateOne({_id: req.body.orderId}, { status: req.body.status }, (err, data)=> {
                if(err) {
                    return res.redirect('/admin/orders')
                }
                // Emit event 
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
                return res.redirect('/admin/orders')
            })
        },

        userupdate(req, res) {
            User.updateOne({_id: req.body.userId}, { isverified: req.body.isverified }, (err, data)=> {
                if(err) {
                    return res.redirect('/admin/users')
                }
                // Emit event 
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('userUpdated', { id: req.body.userId, isverified: req.body.isverified })
                return res.redirect('/admin/users')
            })
        },

        productupdate(req, res) {
            Product.updateOne({_id: req.body.userId}, { isverified: req.body.isverified }, (err, data)=> {
                if(err) {
                    return res.redirect('/admin/products')
                }
                // Emit event 
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('userUpdated', { id: req.body.userId, isverified: req.body.isverified })
                return res.redirect('/admin/products')
            })
        }
    }
}

module.exports = statusController