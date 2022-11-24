//Import knex so the controller has access to the DB
const knex = require('knex')(require('../knexfile'));


//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
exports.singleInventory = async (req, res) => {
    try {
        const data = await knex('inventories').where({ item_name: req.params.item_name});
        const filter= await data.filter(item=>item.warehouse_id===req.params.id)
        if (!data.length) {
            return res.status(404).send(`Record with id: ${req.params.item_name} is not found`);
        }
    
        res.status(200).json(filter);
    } catch (err) {
        res.status(400).send(`Error retrieving inventory ${req.params.item_name} ${err}`)
    }
};