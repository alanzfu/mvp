var pg = require('pg');
var Promise = require('bluebird');
var database = require('./db/models/index.js');


module.exports.companies = function(req, res){
  database.companies.get(function(err, data){
    if(err){
      console.log('get error');
      throw err;
    }
    res.send(data);
  });
}

module.exports.technologies = function(req, res){
  database.technologies.post(req.body.companies, function(err, data){
    if(err){
      throw err;
    }
    res.send(data);
  });
}