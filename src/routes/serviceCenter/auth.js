const express=require('express');
const {signup, signout, signin, getTotalServiceCentersWithDetails, forgotPassword, 
  verifyCodeAndResetPassword,  getServiceCenterProfileDetailsByUsingServiceCenterId,
   updateTheserviceCenterProfile }=require("../../controllers/serviceCenter/auth");
const { validateSignUpRequest,validateSignInRequest, isRequestValidated } = require('../../validator/auth');
const { requireSignIn, adminMiddleware } = require('../../common-middleware');
const router=express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads')); // Adjust the destination path as needed
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/serviceCenter/signup',validateSignUpRequest, isRequestValidated , signup);
router.post('/serviceCenter/signin', validateSignInRequest, isRequestValidated , signin );
router.post('/serviceCenter/signout', requireSignIn,  signout);
router.post('/serviceCenter/forgotPassword', forgotPassword);
router.post('/serviceCenter/verifyCodeAndResetPassword',  verifyCodeAndResetPassword);
router.get('/serviceCenter/getServiceCenters', getTotalServiceCentersWithDetails);
router.post('/serviceCenter/getTotalServiceCentersWithDetails', requireSignIn, adminMiddleware, getTotalServiceCentersWithDetails);

// router.post('/serviceCenter/checkEmailVerified', checkEmailVerified);


// service center profile

router.get("/serviceCenter/getServiceCenterDetailsBy/:serviceCenterId",
getServiceCenterProfileDetailsByUsingServiceCenterId)
router.put('/serviceCenter/updateProfileDetailsBy/:serviceCenterId',
 upload.single('profilePicture'),
updateTheserviceCenterProfile)

module.exports=router;