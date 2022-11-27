//Import knex so the controller has access to the DB
const knex = require('knex')(require('../knexfile')); 
const {v4: uuidv4} = require('uuid');


//API TO POST INVENTORY ITEMnode 
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
