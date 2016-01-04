var pg = require('pg');
var Promise = require('bluebird');
var database = require('./db/models/index.js');
var archiver = require('./helpers/scrape.js');

module.exports.technologies = function(req, res){
  database.companies.get(function(err, data){
    if(err){
      throw err;
    }
    console.log(data);
    res.send(data);
  });
}

module.exports.companies = function(req, res){
  database.companies.post(req.body, function(err, data){
    if(err){
      throw err;
    }
    res.send(data);
  });
}