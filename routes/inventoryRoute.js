const router = require('express').Router();
const inventoryDeleteController = require('../controllers/inventoryDeleteController');

//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router.route('/:id').delete(inventoryDeleteController.deleteInventory);
module.exports = router;




