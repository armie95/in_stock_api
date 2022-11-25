//Import knex so the controller has access to the DB
const knex = require('knex')(require('../knexfile'));

//API TO GET SINGLE INVENTORY ITEM -KO26
exports.singleInventory = async (req, res) => {
    try {
        const data = await knex('inventories').join('warehouses','warehouses.id', 'inventories.warehouse_id').where({'inventories.id':req.params.id})
        .select( "inventories.id",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.quantity", 
        "inventories.status",
        "warehouse_id",
        "warehouses.warehouse_name"
        )
        if (!data.length) {
            return res.status(404).send(`Record with id: ${req.params.id} is not found`);
        }
    
        res.status(200).json(data[0]);
    } catch (err) {
        console.log(err)
        res.status(400).send(`Error retrieving inventory ${req.params.id} ${err}`)
    }
};


