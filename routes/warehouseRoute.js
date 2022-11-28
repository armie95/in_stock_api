//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse);

router.route("/:id").get(warehouseController.getWarehouseDataById);

module.exports = router;
