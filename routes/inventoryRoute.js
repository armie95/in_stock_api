//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');
const inventoryDeleteController = require('../controllers/inventoryDeleteController');
//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router.route("/:id").get(inventoryController.singleInventory);
//API TO DELETE A SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router.route('/:id').delete(inventoryDeleteController.deleteInventory);
module.exports = router;