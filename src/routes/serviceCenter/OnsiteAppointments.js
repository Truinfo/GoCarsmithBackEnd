const express = require('express');
const { requireSignIn, adminMiddleware, userMiddleware } = require('../../common-middleware');
const {
    getAppointmentByServiceCenterId, getAppointmentsByDate,
    updateServiceCenterApponitmentStatus, deleteServiceCenterAppointment,
    AddAppointmentInServiceCenter,
    getUserDetailsByAppointments, getUserServicesFromAppointment,
    getTotalAppointmentByServiceCenterId,
    getOnsiteAppointmentsByDate,
    updateServiceCenterOnsiteApponitmentStatus,
    deleteServiceCenterOnsiteAppointment,
    getTotalOnsiteAppointmentByServiceCenterId,
    getAllAppointmentDetailsByServiceCenterId,
    getAllAppointmentDatesByServiceCenterId,getOnsiteAppointmentsById,
    TotalAppointments,
    TotalOnsiteAppointment,
    getTotalOnsiteAppointments} = require('../../controllers/serviceCenter/OnsiteAppointments');
    
const router = express.Router();



router.post('/ServiceCenter/AddAppointment',
    // requireSignIn, userMiddleware, 
    AddAppointmentInServiceCenter);



// router.get('/appointments/:serviceCenterId', getAppointmentsByDate)

// router.get('/getAppointmentByServiceCenterId/:ServiceCenterId', getAppointmentByServiceCenterId)

router.put('/ServiceCenter/completedAppointment/:_id', updateServiceCenterApponitmentStatus);

router.delete('/ServiceCenter/deleteAppointmnetBy/:appointmentId', deleteServiceCenterAppointment)

router.post('/ServiceCenter/getUsersByIds', getUserDetailsByAppointments)

router.get("/ServiceCenter/ListOfSevicesBy/:userId", getUserServicesFromAppointment)

//dash board


router.get('/ServiceCenter/getTotalAppointmentsBy/:ServiceCenterId', getTotalAppointmentByServiceCenterId)

//onsiteAppointms

router.put('/ServiceCenter/completedOnsiteAppointment/:_id',updateServiceCenterOnsiteApponitmentStatus)
router.get("/serviceCenter/getOnsiteAppointMentBydate/:serviceCenterId", getOnsiteAppointmentsByDate)

router.delete("/ServiceCenter/deleteOnsitEAppointmnetBy/:appointmentId",deleteServiceCenterOnsiteAppointment)
router.get('/ServiceCenter/getTotalOnsiteAppointmentsBy/:ServiceCenterId' ,getTotalOnsiteAppointmentByServiceCenterId)
router.get('/ServiceCenter/getAllAppointmentDatesByServiceCenterId/:ServiceCenterId', getAllAppointmentDatesByServiceCenterId);
router.get('/admin/getAllAppointments', getTotalOnsiteAppointments);
router.get('/admin/TotalAllAppointments', TotalOnsiteAppointment);
router.get('/admin/TotalAllAppointments/ALL', TotalAppointments);

router.get('/onsite/getOnsiteAppointmentsById/:appointmentId',getOnsiteAppointmentsById)

module.exports=router;