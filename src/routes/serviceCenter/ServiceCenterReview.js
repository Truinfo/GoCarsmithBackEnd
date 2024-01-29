const express=require('express');
const { requireSignIn, userMiddleware } = require('../../common-middleware');
const { addReview, getReviewsByServiceId, getAllreviews } = require('../../controllers/serviceCenter/ServiceCenterReviews');
const router = express.Router();

router.post('/ServiceCenterReviews', addReview);
router.get('/ServiceCenterReviews/:serviceCenterId', getReviewsByServiceId);
router.get('/getAllServiceCenterReviews', getAllreviews);
module.exports = router;