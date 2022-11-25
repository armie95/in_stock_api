const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
router
  .route('/:id')
  .get(inventoryController.singleInventory)


module.exports = router;