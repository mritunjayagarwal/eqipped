function vendor (req, res, next) {
    if(req.isAuthenticated() && req.user.role!= 'customer') {
       return next()
    }
    return res.redirect('/home')
}

module.exports = vendor