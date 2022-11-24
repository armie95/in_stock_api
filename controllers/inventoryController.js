//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));

exports.index = async (req, res) => {
  try {
    const inventoriesData = await knex("inventories").select(
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
    res.status(200).json(inventoriesData);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`);
  }
};
