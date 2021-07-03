module.exports.isLoggedIn = (req, res, next) => {
    // console.log('REQ.USER..... ', req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        // console.log(req.path , req.originalUrl)
        req.flash('error', 'you must be signed in first!');
        return res.redirect('/login');
    }
    next();
}