var pg = require('pg');
console.log('db connection ran')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';

var client = new pg.Client(connectionString);
client.connect();


client.query("CREATE TABLE company (name VARCHAR(40), id SERIAL PRIMARY KEY, count SMALLINT)", function(err,res){
  if(err){
    return console.log('error creating company table');
  }
});

client.query("CREATE TABLE IF NOT EXISTS technology (name VARCHAR(40), id SERIAL PRIMARY KEY)", function(err,res){
  if(err){
    return console.log('error creating tech table');
  }
});

client.query('CREATE TABLE IF NOT EXISTS combos (companyName VARCHAR(40), technologyName VARCHAR(40))', function(err,res){
  if(err){
    return console.log('error creating combo table');
  }
});

// client.query('ALTER TABLE combos ADD FOREIGN KEY (companyId) REFERENCES company (id);', function(err, res){
//   if(err){
//     console.log('error altering forieng key')
//   }
// });
// client.query('ALTER TABLE combos ADD FOREIGN KEY (technologyId) REFERENCES technology (id);', function(err, res){
//   if(err){
//     console.log('error altering forieng key')
//   }
// });

module.exports = client;