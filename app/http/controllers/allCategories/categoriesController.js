const Category = require('../../../models/categories')
const Brand = require('../../../models/brand')



function categoriesController() {
    return{
        async categories(req, res) {
            const nashta = await Category.find()
            const brand = await Brand.find()
            return res.render('allCategories/allCategoriesPage', {nashta: nashta, brand: brand})
        }
    }
}


module.exports = categoriesController