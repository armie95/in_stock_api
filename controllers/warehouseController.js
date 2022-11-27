//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));

exports.index = async (req, res) => {
    try {
        const warehouseData = await knex("warehouses").select(
          "id",
          "warehouse_name",
          "address",
          "city",
          "country",
          "contact_name",
          "contact_phone",
          "contact_email"
        );
        res.status(200).json(warehouseData);
      } catch (err) {
        res.status(400).send(`Error retrieving Warehouses: ${err}`);
      };
};

exports.getInfoForEdit = async (req, res) => {
    try { 
        const warehouseData = await knex('warehouses')
        .select('id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email')
        .where({id: req.params.id})
        res.status(200).json(warehouseData);
    } catch (err) {
        res.status(400).send(`Error retrieving Warehouses: ${err}`)
    }
};


exports.editWarehouse = async (req, res) => {
   
        const re = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email)
        {return res.status(400).send('Please complete all fields')}
        else if (!((req.body.contact_phone).match(re))) {
            return res.status(400).send('Please follow phone pattern')
        }
        else if(!((req.body.contact_email).match(emailPattern))){
            return res.status(400).send('Please follow email pattern')
        }
try {
    await knex('warehouses')
    .where({id: req.params.id}).update(req.body);
    res.status(200).send(`Warehouse with id: ${req.params.id} has been updated`);
    } 
    catch (err) {res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)};
    
};



// Get all warehouse data by warehouse id:
exports.getWarehouseDataById = async (req, res) => {
  const warehouseID = req.params.id;

  try {
    const warehouseData = await knex("warehouses")
      .join("inventories", "warehouses.id", "=", "inventories.warehouse_id")
      .where("warehouses.id", "=", warehouseID)
      .select(
        "inventories.warehouse_id",
        "warehouses.warehouse_name",
        "warehouses.address",
        "warehouses.city",
        "warehouses.country",
        "warehouses.contact_name",
        "warehouses.contact_phone",
        "warehouses.contact_email",
        "inventories.id",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.quantity"
      );
    res.status(200).json(warehouseData);
  } catch (err) {
    res
      .status(400)
      .send(
        `Error retrieving Warehouse with the given ID of ${warehouseID} ${err}`
      );
  }
};
