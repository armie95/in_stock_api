//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));
const {v4: uuidv4} = require('uuid');

exports.index = async (req, res) => {
  try {
    const warehouseData = await knex("warehouses").select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_phone",
      "contact_email"
    );
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`);
  }
};

// Get all warehouse data by warehouse id:
exports.getWarehouseDataById = async (req, res) => {
  const warehouseID = req.params.id;

  try {
    const warehouseData = await knex("warehouses")
      .join("inventories", "warehouses.id", "=", "inventories.warehouse_id")
      .where("warehouses.id", "=", warehouseID)
      .select(
        "inventories.warehouse_id",
        "warehouses.warehouse_name",
        "warehouses.address",
        "warehouses.city",
        "warehouses.country",
        "warehouses.contact_name",
        "warehouses.contact_phone",
        "warehouses.contact_email",
        "inventories.id",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.quantity"
      );
    res.status(200).json(warehouseData);
  } catch (err) {
    res
      .status(400)
      .send(
        `Error retrieving Warehouse with the given ID of ${warehouseID} ${err}`
      );
  }
};

exports.addWarehouse = async (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send("Please make sure to fill out the form completely");
  }

  try {
    const newWarehouse = req.body;
    newWarehouse.id = uuidv4();
    const data = await knex('warehouses').insert(newWarehouse);
    const newWarehouseURL = `/warehouse/${newWarehouse.id}`;
    res.status(201).location(newWarehouseURL).send(newWarehouseURL)
  } catch (err) {
    res.status(400).send(`Error creating warehouse: ${err}`)
  }
};