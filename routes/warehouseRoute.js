//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse)
    .delete(warehouseController.deleteWarehouse);

router
    .route("/:id")
    .get(warehouseController.getWarehouseDataById);

router
    .route('/:id/inventory')
    .get(warehouseController.getWarehouseInventoryById)

module.exports = router;
