const express = require('express');
const { addCategory, getCategories,  } = require('../../controllers/admin/category');
const { requireSignIn, adminMiddleware } = require('../../common-middleware');
const router = express.Router();


// Add a new category
router.post('/admin/categories', requireSignIn, adminMiddleware,addCategory);
router.get('/admin/getcategories/get', requireSignIn, adminMiddleware, getCategories );
router.get('/getcategories/get',
//  requireSignIn, adminMiddleware,
  getCategories );
module.exports = router;
