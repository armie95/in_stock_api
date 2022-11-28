const knex = require('knex')(require('../knexfile'));

exports.deleteInventory = async (req,res) => {
    try{
        await knex('inventories').where({id : req.params.id}).delete();
        res.status(204);
    } catch(error){
        res.status(400).send(`Error deleting Warehouse ${req.params.id} ${error}`);
    }
};