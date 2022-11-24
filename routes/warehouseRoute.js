//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router
    .route('/')
    .get(warehouseController.index)

router
    .route('/:id/edit')
    .get(warehouseController.getInfoForEdit)
    .patch(warehouseController.editWarehouse)

module.exports = router;