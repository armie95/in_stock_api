const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');
const inventoryEditController = require('../controllers/inventoryEditController');


//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router.route('/:id').get(inventoryController.singleInventory)
router.route('/:id/edit').put(inventoryEditController.updateInventory);


module.exports = router;