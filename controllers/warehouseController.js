//Import knex so the controller has access to the DB
const knex = require("knex")(require("../knexfile"));
const {v4: uuidv4} = require('uuid');

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

//function to get warehouse info on pageload
exports.getInfoForEdit = async (req, res) => {
  try {
    const warehouseData = await knex('warehouses')
      .select('id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email')
      .where({ id: req.params.id })
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`)
  }
    
};

//to delete warehouse
exports.deleteWarehouse = async (req, res) => {
    try {
        await knex('warehouses')
        .where({id: req.body.id}).delete();
        res.status(204).send(`Warehouse with id: ${req.body.id} has been deleted`);
    } catch (err) {res.status(400).send(`Error deleting Warehouse ${req.body.id} ${err}`)};
};

//function to edit the info
exports.editWarehouse = async (req, res) => {
  const re = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email) { return res.status(400).send('Please complete all fields') }
  else if (!((req.body.contact_phone).match(re))) {
    return res.status(400).send('Please follow phone pattern')
  }
  else if (!((req.body.contact_email).match(emailPattern))) {
    return res.status(400).send('Please follow email pattern')
  }
  try {
    await knex('warehouses')
      .where({ id: req.params.id }).update(req.body);
    res.status(200).send(`Warehouse with id: ${req.params.id} has been updated`);
  }
  catch (err) { res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`) };

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

exports.addWarehouse = async (req, res) => {
  //Making sure all fields are complete
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send("Please make sure to fill out the form completely");
  }

  //Regex to make sure phone is a valid phone number
  const phoneValidation = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  if (!req.body.contact_phone.match(phoneValidation)) {
    return res.status(400).send("Please enter valid phone number")
  }
  //Regex to make sure email is valid
  const emailValidation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!req.body.contact_email.match(emailValidation)) {
    return res.status(400).send("Please enter valid email address")
  }

  //Once all fields are correct, update to actual DB
  try {
    const newWarehouse = req.body;
    newWarehouse.id = uuidv4();
    const data = await knex('warehouses').insert(newWarehouse);
    const newWarehouseURL = `/warehouse/${newWarehouse.id}`;
    res.status(201).location(newWarehouseURL).send(newWarehouseURL)
  } catch (err) {
    res.status(400).send(`Error creating warehouse: ${err}`)
  }
};