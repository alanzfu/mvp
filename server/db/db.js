var pg = require('pg');

var dbConnectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';
var client = new pg.Client(dbConnectionString);
client.connect(function(err, db, done){
  if(err){
    throw err;
  }
});

//create your tables here if they do not exist



module.exports = client;