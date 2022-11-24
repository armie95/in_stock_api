//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router.route("/:id").get(inventoryController.getInventoriesByWarehouseId);

module.exports = router;
