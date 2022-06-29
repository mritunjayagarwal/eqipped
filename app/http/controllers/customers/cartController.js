const { json } = require("express")


function cartController() {
    return{

        index(req, res) {
            res.render('customers/cart')
        },

        update(req, res) {
            
            if (!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart

                // Check if item does not exist in cart
                if(!cart.items[req.body._id]){
                    cart.items[req.body._id] = {
                        item: req.body,
                        qty: 1
                    }
                    cart.totalQty = cart.totalQty + 1;
                    cart.totalPrice = cart.totalPrice + req.body.price
                } else {
                    cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                    cart.totalQty = cart.totalQty + 1
                    cart.totalPrice = cart.totalPrice + req.body.price  
                }

                
            return res.json({ totalQty: req.session.cart.totalQty})
        },

        deupdate(req, res) {

            let cart = req.session.cart

                // Check if item does not exist in cart
                if(!cart.items[req.body._id]){
                    cart.items[req.body._id] = {
                        item: req.body,
                        qty: 0
                    }
                    // cart.totalQty = cart.totalQty - 1;
                    // cart.totalPrice = cart.totalPrice - req.body.price;                    
                } else if(cart.items[req.body._id].qty > 1){
                    cart.items[req.body._id].qty = cart.items[req.body._id].qty - 1
                    cart.totalQty = cart.totalQty - 1
                    cart.totalPrice = cart.totalPrice - req.body.price  
                // }  else if(cart.items[req.body._id].qty = 1){
                //     cart.totalQty = cart.totalQty - 1
                //     cart.totalPrice = cart.totalPrice - req.body.price  
                //     delete cart.items[req.body._id]
                }
                
                
            return res.json({ totalQty: req.session.cart.totalQty, specificQty: req.session.cart.items[req.body._id].qty})
        },


        removeUpdate(req, res) {
            let cart = req.session.cart


                // Check if item does not exist in cart
                if(cart.items[req.body._id]){
                    cart.totalQty = cart.totalQty - cart.items[req.body._id].qty
                    cart.totalPrice = cart.totalPrice - req.body.price * cart.items[req.body._id].qty
                    delete cart.items[req.body._id]
                    }      
                
                    
                    if(cart.totalQty == 0 || cart.totalPrice == 0){
                        delete req.session.cart
                    }

                    try {
                        return res.json({ totalQty: req.session.cart.totalQty })
                    }
                    catch(err) {
                        return res.redirect('/cart')                                                
                      }


                }
    }
}

module.exports = cartController