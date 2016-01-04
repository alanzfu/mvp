
var db = require('../db.js');


module.exports = {
  companies: {
    get: function(callback){
      db.Company.findAll({})
      .then(function(results){
        console.log('from index',results);
        callback(results);
      })
    }
  },
  technologies: {
    post: function(companyList, callback){
      return 'post';
      //for company in companyList
        //if company is already in db, then query for it
        //if company is not in db, request the html
          //
        //query the database for technologies that match the company name

    }
  }
}