const express=require('express');
const { requireSignIn, userMiddleware } = require('../../common-middleware');
const { addReview, getReviewsByServiceId, getAllreviews } = require('../../controllers/admin/review');
const router = express.Router();

router.post('/reviews', requireSignIn, userMiddleware, addReview);
router.get('/reviews/:serviceId', getReviewsByServiceId);
router.get('/getAllreviews', getAllreviews);
module.exports = router;