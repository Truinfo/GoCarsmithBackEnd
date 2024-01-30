const express = require('express');
const { createReminder, getAllReminders, deleteReminder } = require('../../controllers/admin/reminder');
const { requireSignIn, adminMiddleware } = require('../../common-middleware');
const router = express.Router();

router.post('/admin/createReminder', createReminder);
router.get('/admin/getAllReminders', getAllReminders);
router.delete('/admin/deleteReminder/:id', deleteReminder);

module.exports = router;
