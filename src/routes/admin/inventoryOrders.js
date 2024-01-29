const express=require('express');
const {getAllRequestsFromDataBase, editStatusOfInventoryRequestApproveOrRejected, getRequestsByStatus } = require('../../controllers/serviceCenter/inventoryRequest');
const { requireSignIn, adminMiddleware} = require('../../common-middleware');
const router=express.Router();

router.get ('/admin/getAllOrders', requireSignIn, adminMiddleware, getAllRequestsFromDataBase);
router.patch('/admin/editStatusAfterAcceptedOrRejected/:requestId', requireSignIn, adminMiddleware, editStatusOfInventoryRequestApproveOrRejected )
router.get ('/admin/getRequestsByStatus/:status', requireSignIn, adminMiddleware, getRequestsByStatus);

module.exports=router;