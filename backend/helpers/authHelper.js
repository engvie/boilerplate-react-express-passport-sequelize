
onlyAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}


onlyNoneAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    return res.redirect('/dashboard'); 
}

module.exports = {
    onlyAuthenticated,
    onlyNoneAuthenticated,
};
