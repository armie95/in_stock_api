// Set up Knex export with necesasry information. This will pull from your .env file that you will
// need to set up on your oown using the .envsample as a guide. 
require('dotenv').config()

module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    charset: 'utf8',
    database: 'instock',
    user: 'root',
    password: 'rootroot',
  },
};
