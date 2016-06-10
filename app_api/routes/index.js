var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

// locations
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:locationid/review', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/review/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/review/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/review/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;