const express=require('express');
const { generateInvoice, getCovertDataToInvoicePDFById, getInvoicePdfById, deleteInvoiceById,getInvoiceByServiceCenterId,deleteServiceCenterInvoiceById, getAllGeneratedInvoices, updateInvoice, getInvoiceById, generateServiceCenterInvoice,updateServiceCenterInvoice,getCovertDataToServiceCenterInvoicePDFById,getServiceCenterInvoicePdfById, getTotalInvoices } = require('../../controllers/admin/invoiceGeneration');
const { requireSignIn, adminMiddleware } = require('../../common-middleware');
const router=express.Router();


router.post("/invoiceGenerate", 
 requireSignIn, adminMiddleware, 
generateInvoice);
router.get('/generatePdf/:_id', requireSignIn, adminMiddleware, getCovertDataToInvoicePDFById);
router.get('/getPdf/:_id', requireSignIn, adminMiddleware, getInvoicePdfById)
router.delete('/deleteInvoice/:_id', requireSignIn, adminMiddleware, deleteInvoiceById)
router.get('/getGeneratedInvoice',getAllGeneratedInvoices)
router.put('/updateInvoice/:id',updateInvoice)
router.get('/getInvoiceById/get/:id',getInvoiceById)
//ServiceCenter
router.post("/ServiceCenter/invoiceGenerate", generateServiceCenterInvoice);
router.put('/ServiceCenter/updateInvoice/:_id',updateServiceCenterInvoice)
router.get('/getServiceCenterInvoiceBy/:serviceCenterId',getInvoiceByServiceCenterId)
router.delete('/ServiceCenter/deleteInvoice/:_id',  deleteServiceCenterInvoiceById)
router.get('/ServiceCenter/generatePdf/:_id',getCovertDataToServiceCenterInvoicePDFById);
router.get('/ServiceCenter/getInvoiceById/:_id',getServiceCenterInvoicePdfById)
router.get('/admin/getTotalInvoices',getTotalInvoices);
module.exports=router;