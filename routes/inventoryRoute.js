const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router.route('/').post(inventoryController.addInventory);

module.exports = router;