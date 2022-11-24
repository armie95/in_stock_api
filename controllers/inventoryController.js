//Import knex so the controller has access to the DB
const knex = require('knex')(require('../knexfile')); 

//API TO POST INVENTORY ITEM
exports.addInventory = async (req, res) => {
    // Validate the request body for required data
    if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity) {
        return res.status(400).send('Please make sure to provide name, description, category, status and quantity fields in the request');
    }
  
    try {
        const data = await knex('inventories').insert(req.body);
        const newInventoryURL = `/inventory/${data}`;
        res.status(201).location(newInventoryURL).send(newInventoryURL);
    } catch (err) {
        res.status(400).send(`Error creating Inventory: ${err}`);
    }
  };
