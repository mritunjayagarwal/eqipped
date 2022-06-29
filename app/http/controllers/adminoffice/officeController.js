const Product = require('../../../models/product')

function officeController() {
    return {
        async index(req, res) {
            const products = await Product.find()
            return res.render('adminoffice/fetchproducts', { product: products })
        },
        async productindex(req, res) {
            let product_id = req.params._id;
            const data = await Product.findOne({'_id': `${ product_id }`})
            return res.render('adminoffice/editproducts', { data: data })
        },

        async postproductedit(req, res) {
            const { id, name, categoryName, brand, price, size, containedLiquid, volume, piecePerPack, netQuantity, HSN, GST, itemWeight, description } = req.body
            Product.findByIdAndUpdate({ _id: id }, { name, categoryName, brand, price, size, GST, HSN, containedLiquid, volume, piecePerPack, netQuantity, description, itemWeight }, (err, data) => {
                if (!err) {
                    req.flash('error', 'Update Scessfully')
                    return res.redirect('/office/editproduct')
                } else {
                    return res.redirect('/forgotpassword')
                }
            })
        }
    }
}

module.exports = officeController