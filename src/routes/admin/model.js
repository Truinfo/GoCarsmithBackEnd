const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const shortid=require('shortid');
const { deleteModel,updateModel,getModel, addModel, getModelById, getFuelTypesByBrandAndModel, getModelByIdOrName } = require('../../controllers/admin/model');
const { requireSignIn, adminMiddleware } = require('../../common-middleware');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
router.post('/admin/addModel', upload.single('modelImage'), requireSignIn, adminMiddleware, addModel);
router.delete('/deleteModel/:id', requireSignIn, adminMiddleware, deleteModel);
router.put('/updateModel/:id', upload.single('modelImage'), requireSignIn, adminMiddleware, updateModel,);
router.get('/getModel/:BrandId', getModel);
router.get( '/getCarModel/:id', getModelById);
router.get('/getFuelTypesByBrandAndModel/:brandId/:modelId', getFuelTypesByBrandAndModel);


router.get('/serviceCenter/CarmodelNameBy/:id',getModelByIdOrName)

module.exports = router;

 


