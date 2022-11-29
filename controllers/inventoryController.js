//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));
const {v4: uuidv4} = require('uuid');

exports.index = async (req, res) => {
  try {
    const inventoriesData = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "inventories.id",
        "inventories.warehouse_id",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity",
        "warehouses.warehouse_name"
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
// API TO DELETE SINGLE INVENTORY
exports.deleteInventory = async (req,res) => {
  try{
      await knex('inventories').where({id : req.body.id}).delete();
      res.status(204);
  } catch(error){
      res.status(400).send(`Error deleting Warehouse ${req.body.id} ${error}`);
  }
};

//API TO POST INVENTORY ITEM
exports.addInventory= async (req, res) => {
  // Validate the request body for required data
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
//API TO EDIT INVENTORY ITEM
exports.updateInventory = async (req, res) => {
  // this will check if all the fields are filled it (as it should)
  if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity || !req.body.warehouse_name) { 
    return res.status(400).send('Ensure that every that the form is completed!') }
  try {
    await knex('inventories')
      .where({ id: req.params.id }).update(req.body);
    res.status(200).send(`Warehouse with id: ${req.params.id} has been updated`);
  }
  catch (error) { res.status(400).send(`Error updating Warehouse ${req.params.id} ${error}`) };
};