const express = require('express');
const { addBrands, deleteBrand, putBrand, getBrands, brandLocation } = require('../../controllers/admin/brands');
const router = express.Router();
const { requireSignIn, adminMiddleware } = require('../../common-middleware');
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

router.post('/admin/addBrands', upload.single('brandImage'), requireSignIn, adminMiddleware, addBrands);
router.get('/admin/getBrands', getBrands);
router.delete('/admin/brands/:id', deleteBrand);
router.put('/admin/brands/:id', upload.single('brandImage'), putBrand);
router.get('/brands/location/:locationId', brandLocation)

module.exports = router;
