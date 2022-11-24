//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));

exports.getInventoriesByWarehouseId = async (req, res) => {
  const warehouseId = req.params.id;

  try {
    const inventories = await knex("inventories")
      .where({
        warehouse_id: warehouseId,
      })
      .select(
        "id",
        "warehouse_id",
        "item_name",
        "description",
        "category",
        "status",
        "quantity",
        "created_at",
        "updated_at"
      );
    res.status(200).json(inventories);
  } catch (err) {
    res.status(400).send(`Error retrieving Inventory Items: ${err}`);
  }
};
