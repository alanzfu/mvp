var pg = require('pg');
var Promise = require('bluebird');
var database = require('./db/models/index.js');
var archiver = require('./helpers/scrape.js');


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
  console.log('PLEASE GOD WORK', req.body);
  res.send('done');
  // var companyList = req.body.selectedCompanies;
  // database.technologies.post(req.body, function(err, data){
  //   if(err){
  //     throw err;
  //   }
  //   res.send(data);
  // });
}