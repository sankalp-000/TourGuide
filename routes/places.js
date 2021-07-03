const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { placeSchema } = require('../schemas.js');
const { isLoggedIn ,isAuthor,validatePlace} = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Place = require('../models/place');

router.get('/', catchAsync(async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
}));

router.get('/new',isLoggedIn, (req, res) => {
    res.render('places/new');
})


router.post('/', isLoggedIn,validatePlace, catchAsync(async (req, res, next) => {
    
    const place = new Place(req.body.place);
    place.author= req.user._id;
    await place.save();
    req.flash('success', 'Successfully added a new tourist spot!');
    res.redirect(`/places/${place._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const place = await Place.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    // console.log(place);
    if (!place) {
        req.flash('error', 'Cannot find that place!');
        return res.redirect('/places');
    }
    res.render('places/show', { place });
}));

router.get('/:id/edit', isLoggedIn ,isAuthor,catchAsync(async (req, res) => {
    const place = await Place.findById(req.params.id)
    if (!place) {
        req.flash('error', 'Cannot find that place!');
        return res.redirect('/places');
    }
    res.render('places/edit', { place });
}))

router.put('/:id', isLoggedIn,isAuthor,validatePlace, catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
    req.flash('success', 'Successfully updated the place details!');
    res.redirect(`/places/${place._id}`)
}));

router.delete('/:id', isLoggedIn,isAuthor,catchAsync(async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the tourist spot')
    res.redirect('/places');
}));

module.exports = router;