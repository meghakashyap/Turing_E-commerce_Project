const knex = require("knex")({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'Megha@8287',
      database : 'Turing'
    }
});

module.exports=knex;