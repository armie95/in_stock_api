//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");
const inventoryController = require("../controllers/inventoryController");

router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse)
    .delete(warehouseController.deleteWarehouse);

router
    .route('/:id/edit')
    .get(warehouseController.getInfoForEdit)
    .put(warehouseController.editWarehouse)

router
    .route("/:id")
    .get(warehouseController.getWarehouseDataById)
    
router
    .route('/:id/inventory')
    .get(warehouseController.getWarehouseInventoryById);

router
  .route("/:id/inventory")
  .get(inventoryController.getInventoriesByWarehouseId);

module.exports = router;
