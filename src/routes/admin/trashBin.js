const express = require('express');
const { restoreFromTrash, getTrashItems, permanentlyDeleteFromTrash, clearTrash } = require('../../controllers/admin/trashBin');
const router=express.Router();

router.get('/trash', getTrashItems);
router.put('/trash/restore/:id', restoreFromTrash);
router.delete('/trash/delete/:id', permanentlyDeleteFromTrash);
router.delete('/trash/clear', clearTrash);

module.exports = router;