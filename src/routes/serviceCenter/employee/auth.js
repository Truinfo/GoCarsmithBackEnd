const express=require('express');
const {signup, signin, signout, getTotalEmployeeWithDetails, forgotPassword, verifyCodeAndResetPassword, updateEmployee, deleteEmployee, getEmployeesByServiceCenter}=require("../../../controllers/serviceCenter/employee/auth");
const { validateSignUpRequest, isRequestValidated, validateSignInRequest} = require('../../../validator/auth');
const router=express.Router();
const { requireSignIn, adminMiddleware, serviceCenterMiddleware } = require('../../../common-middleware');
router.post('/employee/signup', validateSignUpRequest , isRequestValidated, requireSignIn, serviceCenterMiddleware, signup);
router.post('/employee/getTotalEmployeeWithDetails', requireSignIn, adminMiddleware, getTotalEmployeeWithDetails);
router.get('/employee/getTotalEmployee', requireSignIn, serviceCenterMiddleware, getTotalEmployeeWithDetails);
router.post('/employee/verifyCodeAndResetPassword',  verifyCodeAndResetPassword);
router.get('/employee/getEmployees/:serviceCenterId', getEmployeesByServiceCenter);
router.put('/employee/update/:employeeId', requireSignIn, serviceCenterMiddleware, updateEmployee);
router.put('/employee/updateE/:employeeId', updateEmployee);
router.delete('/employee/deleteEmployee/:employeeId', deleteEmployee)
// router.post('/employee/signin', validateSignInRequest, isRequestValidated ,signin);
// router.post('/employee/signout', requireSignIn, signout);
// router.post('/employee/forgotPassword', forgotPassword);
module.exports=router;