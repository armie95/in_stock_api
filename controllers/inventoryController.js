//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));

exports.index = async (req, res) => {
  try {
    const inventoriesData = await knex("inventories")
      .join("warehouses", "warehouses.id", "=", "inventories.warehouse_id")
      .select(
        "inventories.id",
        "inventories.warehouse_id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity",
        "inventories.created_at",
        "inventories.updated_at"
      );
    res.status(200).json(inventoriesData);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`);
  }
};
