
function categoryController() {
    return {
        index(req, res) {
            return res.render('admin/categories')
        }
    }
}

module.exports = categoryController