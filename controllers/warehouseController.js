//Import knex so the controller has access to the DB
const knex = require('knex')(require('../knexfile'));

exports.index = async (req, res) => {
    try {
        const warehouseData = await knex('warehouses')
            .select('id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_phone', 'contact_email');
            res.status(200).json(warehouseData);
    } catch (err) {
        res.status(400).send(`Error retrieving Warehouses: ${err}`)
    }
}