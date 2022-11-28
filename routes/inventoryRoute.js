//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router.route("/").get(inventoryController.index);
router.route('/').post(inventoryController.addInventory);

//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router.route("/:id").get(inventoryController.singleInventory);
//API TO DELETE A SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router.route('/:id').delete(inventoryController.deleteInventory);

module.exports = router;