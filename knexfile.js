// Set up Knex export with necesasry information. This will pull from your .env file that you will
// need to set up on your oown using the .envsample as a guide. 

module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    database: process.env.DB_LOCAL_DBNAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
  },
};
