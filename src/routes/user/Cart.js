const express=require("express");
const { AddItemsToCart, getCartItemsByUserId, RemoveCartItemById,clearCartInDatabase } = require("../../controllers/user/Cart");
const { requireSignIn, userMiddleware } = require("../../common-middleware");

const router=express.Router();

router.post('/AddToCart',
// requireSignIn, userMiddleware,
 AddItemsToCart);

 router.get('/getUserCartBy/:userId', 
 // requireSignIn, userMiddleware,
 getCartItemsByUserId)


 router.delete('/removeCartItemBy/:userId/:itemId',
 // requireSignIn, userMiddleware,
 RemoveCartItemById)
 router.delete('/removeCart/:userId',clearCartInDatabase);
module.exports=router;