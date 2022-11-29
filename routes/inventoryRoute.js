const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router.route('/').get(inventoryController.index);
router.route('/').post(inventoryController.addInventory);

//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE

router.route('/:id').get(inventoryController.singleInventory)
router.route('/:id/edit').put(inventoryController.updateInventory);
//API TO DELETE A SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router.route('/:id').delete(inventoryController.deleteInventory);

module.exports = router;