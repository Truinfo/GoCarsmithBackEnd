
const express=require("express");
const { earnMoneyByReferal, getReferalDetails } = require("../../controllers/user/EarnMoney");


const router=express.Router();


router.post('/earnCoinsByReferalFriend',// requireSignIn, userMiddleware,
earnMoneyByReferal);
 router.get('/getReferalDetailsBy/:userId', 
 // requireSignIn, userMiddleware,
 getReferalDetails)

module.exports=router;