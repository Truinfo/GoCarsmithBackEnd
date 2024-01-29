const express = require('express');
const { addInventoryItem, getInventoryItemsByCategory, getAllInventoryItems, deleteInventoryItem, updateInventoryItem, getInventoryByServiceCenter, getInventoryCount } = require('../../controllers/serviceCenter/serviceCenterInventory');
const { serviceCenterMiddleware, requireSignIn } = require('../../common-middleware');

const router=express.Router();

  

router.post('/addInventoryItem', addInventoryItem)
router.put('/updateInventory/:itemId', updateInventoryItem);
router.delete('/Itemsdelete/:itemId',deleteInventoryItem);
router.get('/AllInventoryItems/get', getAllInventoryItems);
router.get('/inventoryItems/:categoryId', getInventoryItemsByCategory);
router.get('/getInventoryCount', getInventoryCount)
router.get('/admin/getInventoryCount', getInventoryCount);
router.get('/inventoryByServiceCenter/:serviceCenterId', getInventoryByServiceCenter);
module.exports = router;