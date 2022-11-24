//Import knex so the controller has access to the DB
const knex = require('knex')(require('../knexfile'));


//API TO GET SINGLE INVENTORY ITEM FROM SINGLE WAREHOUSE
exports.singleInventory = async (req, res) => {
    try {
        const data = await knex('inventories').where({id:req.params.id});
        if (!data.length) {
            return res.status(404).send(`Record with id: ${req.params.id} is not found`);
        }
    
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving inventory ${req.params.id} ${err}`)
    }
};

// line 9 --- const filter= await data.filter(item=>item.warehouse_id===req.params.id)