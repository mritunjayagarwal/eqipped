const product = require("../../../models/product")
const Coupon = require("../../../models/coupon")

function productController() {
    return {
        index(req, res) {
            product.find({ isverified: { $ne: 'Yes' } }, null, { sort: { 'createdAt': -1 } }).exec((err, products) => {
                if (req.xhr) {
                    return res.json(products)
                } else {
                    return res.render('admin/products')
                }
            })
        },


        async fetchfordeleteproduct(req, res) {
            const products = await product.find()
            return res.render('admin/fetchproducts', { chai: products })
        },
        async deleteproduct(req, res) {
            let product_id = req.params._id;
            await product.deleteOne({_id: product_id})
            const products = await product.find()
            return res.render('admin/fetchproducts', { chai: products })
        },



        createCoupon(req, res) {
            return res.render('admin/createCoupon')
        },

        postcreateCoupon(req, res) {
            const { coupon } = req.body
            const create_coupon = new Coupon({
                couponName : coupon
               
            })
            create_coupon.save().then((create_coupon) => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/createCoupon')
            })
            
        }
    }
}

module.exports = productController