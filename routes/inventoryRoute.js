//Import router for necessary calls.
//Import controller for all functions that need to modify the DB.
const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router.route("/").get(inventoryController.index);

module.exports = router;
