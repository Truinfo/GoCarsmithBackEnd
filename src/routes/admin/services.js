// const express=require('express');
// const { addServices,getAllServicesData,
//     getServicesForAdmin,
//     UpdateServiceById,
//     getServicesByLocationsAndModelIdAndFuelType,
//     getIndividualServiceDetailsById,
//     getSingleServiceDetailsFromIndividualService,

//     AddNewServiceinAlreadyExistedService,
//     getServiceByModelId,
//     getServicesByLocationModelFuelTypeAndField} = require('../../controllers/admin/services');
// const router=express.Router();
// // add service
// router.post('/addService',addServices)
// // router.get('/getService/:location/:brans/:model/:fuel')
// // get service for admin panel
// router.get("/getServiceForAdmin",getServicesForAdmin)
// //get services by location and model id and fuel type
// router.get('/getServicesByModelIdAndFuelType/:locations/:modelId/:fuelType',
//  getServicesByLocationsAndModelIdAndFuelType)
// //get all services in mongodb
// router.get("/getAllServicesData",getAllServicesData)
// router.get("/admin/getServiceByModelId/:modelId",  getServiceByModelId)
// // update the service data
// router.put('/updateServices/:modelId',UpdateServiceById)
// // get individual service by id and service id
// router.get("/getService/:_id/:serviceId",getIndividualServiceDetailsById)
// // get single by id and service id and single id
//  router.get('/getSingleDetailBy/:_id/:serviceId/:singleId',
//  getSingleServiceDetailsFromIndividualService)
// //add new service in already existing service
// router.post("/addNewServiceInAlreadyExistedServiceBy/:modelId/:fuelType/:serviceId",
// AddNewServiceinAlreadyExistedService);
// router.get('/getServicesByLocationModelFuelTypeAndField/:location/:modelId/:fuelType/:field', getServicesByLocationModelFuelTypeAndField);
// module.exports=router;

const express=require('express');
// const { addServices,getAllServicesData,
//     getServicesForAdmin,
//     UpdateServiceById,
//     getServicesByLocationsAndModelIdAndFuelType,
//     getIndividualServiceDetailsById,
//     getSingleServiceDetailsFromIndividualService,

//     AddNewServiceinAlreadyExistedService,
//     getServiceByModelId,
//     getServicesByLocationModelFuelTypeAndField} = require('../../controllers/admin/services');
    const { addServices,getAllServicesData,
        getServicesForAdmin,
        UpdateServiceById,
        getServicesByLocationsAndModelIdAndFuelType,
        getIndividualServiceDetailsById,
        getSingleServiceDetailsFromIndividualService,
        AddNewServiceinAlreadyExistedService,
        getServiceByModelId,
        getServicesByLocationModelFuelTypeAndField,
        updateCarServiceByUsingModelIdAndLocationsAndFuelType} = require('../../controllers/admin/services');
const router=express.Router();

router.post('/addService',addServices)
//add new service in already existing service
router.post("/addNewServiceInAlreadyExistedServiceBy/:modelId/:fuelType/:serviceId",
AddNewServiceinAlreadyExistedService);

// router.get('/getService/:location/:brans/:model/:fuel')
router.get("/getServiceForAdmin",getServicesForAdmin)
router.get('/getServicesByModelIdAndFuelType/:locations/:modelId/:fuelType',
 getServicesByLocationsAndModelIdAndFuelType)
router.get("/getAllServicesData",getAllServicesData)
router.get("/admin/getServiceByModelId/:modelId",  getServiceByModelId)
// get individual service by id and service id
router.get("/getService/:_id/:serviceId",getIndividualServiceDetailsById)
// get single by id and service id and single id
 router.get('/getSingleDetailBy/:_id/:serviceId/:singleId',
 getSingleServiceDetailsFromIndividualService)
router.get('/getServicesByLocationModelFuelTypeAndField/:location/:modelId/:fuelType/:field', getServicesByLocationModelFuelTypeAndField);

 // router.put('/updateServices/:modelId',UpdateServiceById)
router.put('/updateCarServiceByUsingModelIdAndLocationsAndFuelType/:locations/:modelId/:fuelType',
updateCarServiceByUsingModelIdAndLocationsAndFuelType)

module.exports=router;