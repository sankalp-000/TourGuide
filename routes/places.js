const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { placeSchema } = require('../schemas.js');
const { isLoggedIn, isAuthor, validatePlace } = require('../middleware');
const places = require('../controllers/places');
const ExpressError = require('../utils/ExpressError');
const Place = require('../models/place');


router.route('/')
    .get(catchAsync(places.index))
    .post(isLoggedIn, validatePlace, catchAsync(places.createPlace));

router.get('/new', isLoggedIn, places.renderNewForm);

router.route('/:id')
    .get(catchAsync(places.showPlace))
    .put(isLoggedIn, isAuthor, validatePlace, catchAsync(places.updatePlace))
    .delete(isLoggedIn, isAuthor, catchAsync(places.deletePlace));




router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(places.renderEditForm))

module.exports = router;