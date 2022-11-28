//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));

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
      .where("warehouses.id", "=", warehouseID)
      .select(
        "warehouses.id",
        "warehouses.warehouse_name",
        "warehouses.address",
        "warehouses.city",
        "warehouses.country",
        "warehouses.contact_name",
        "warehouses.contact_phone",
        "warehouses.contact_email"
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
