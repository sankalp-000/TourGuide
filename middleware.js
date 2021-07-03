const { placeSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Place =require('./models/place');
const { reviewSchema } = require('./schemas.js');
const Review=require('./models/review');

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



module.exports.validatePlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    const { id } = req.params;
    const place = await Place.findById(id);
    if(!place.author.equals(req.user._id)){
        req.flash('error','you are not allowed to do that');
        return res.redirect(`/places/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async(req,res,next)=>{
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','you are not allowed to do that');
        return res.redirect(`/places/${id}`);
    }
    next();
}






module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
