
var db = require('../db.js');



module.exports = {
  companies: {
    get: function(callback){
      db.query('SELECT * FROM company', function(err, data){
        if(err){
          console.log('get All query effup');
        }
        callback(null,data.rows);
      });
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

