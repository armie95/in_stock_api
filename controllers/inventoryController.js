//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));
const {v4: uuidv4} = require('uuid');

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

//API TO GET SINGLE INVENTORY ITEM -KO26
exports.singleInventory = async (req, res) => {
  try {
    const data = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .where({ "inventories.id": req.params.id })
      .select(
        "inventories.id",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.quantity",
        "inventories.status",
        "warehouse_id",
        "warehouses.warehouse_name"
      );
    if (!data.length) {
      return res
        .status(404)
        .send(`Record with id: ${req.params.id} is not found`);
    }

    res.status(200).json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Error retrieving inventory ${req.params.id} ${err}`);
  }
};


//API TO POST INVENTORY ITEM
exports.addInventory= async (req, res) => {
    // Validate the request body for required data
    console.log(req.body)
    if (!req.body.item_name||!req.body.description||!req.body.category||!req.body.quantity||!req.body.status ||!req.body.warehouse_id){
        return res.status(400).send('Please make sure to provide name, description, category, status, warehouse, and quantity fields in the request');
    }
  
    try {
        const newInventory = req.body;
        newInventory.id = uuidv4();
        const data = await knex('inventories').insert(newInventory);
        const newInventoryURL = `/inventory/${newInventory.id}`;
        res.status(201).location(newInventoryURL).send(newInventoryURL);
    } catch (err) {
        res.status(400).send(`Error creating Inventory: ${err}`);
    }
  };