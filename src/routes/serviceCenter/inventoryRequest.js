const express=require('express');
const { sendInventoryRequest, getInventoryRequest, deleteRequestById, updateInventoryRequest,editStatusOfInventoryRequestApproveOrRejected, rejectInventoryRequest, approveInventoryRequest } = require('../../controllers/serviceCenter/inventoryRequest');
const { requireSignIn, serviceCenterMiddleware} = require('../../common-middleware');
const router=express.Router();

router.post('/serviceCenter/sendInventoryRequest', requireSignIn, serviceCenterMiddleware, sendInventoryRequest);
router.get('/serviceCenter/getInventoryRequest/:serviceCenterId',  requireSignIn, serviceCenterMiddleware, getInventoryRequest);
router.delete('/serviceCenter/deleteRequestById/:requestId', requireSignIn, serviceCenterMiddleware, deleteRequestById)
router.put('/serviceCenter/updateRequest/:requestId', requireSignIn, serviceCenterMiddleware, updateInventoryRequest)
router.get('/admin/getInventoryRequest/:serviceCenterId', getInventoryRequest);

router.put('/serviceCenter/approveInventoryRequest/:_id', approveInventoryRequest);
// router.get ('/admin/allDetails', getAllRequestsFromDataBase );
router.put('/serviceCenter/rejectInventoryRequest/:_id' , rejectInventoryRequest );
router.patch('/editStatusAfterAcceptedOrRejected/:requestId' , editStatusOfInventoryRequestApproveOrRejected )
// router.get('/getPendingRequest',getPendingRequests)
module.exports=router;