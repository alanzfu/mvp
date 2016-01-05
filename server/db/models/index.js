
var db = require('../db.js');
var archive = require('../../helpers/scrape.js');


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
      companyList = companyList.map(function(company){
        return company.name.toLowerCase();
      });
      var allTechnologies = [];
      var step = function(x){
        if(x < companyList.length){
          db.query('SELECT * FROM company WHERE name='+"'"+companyList[x]+"'", function(err,match){
            if(match.name === 'error'){
              archive.scrapeTech(companyList[x],function(arr){
                allTechnologies.push({name:companyList[x], technology:arr});
                db.query('INSERT INTO company (name) values ('+companyList[x]+')', function(err,res){
                  if(err) throw err;
                  step(x + 1);  
                });
              });
              
            }
            else{
              archive.scrapeTech(companyList[x],function(arr){
                allTechnologies.push({name:companyList[x], technology:arr});
                step(x + 1);
              });
              
            }
          });
        } else if (x === companyList.length){
          callback(null,sortingHelper(allTechnologies));
        }
      };
      step(0);
    }
  }
}

var sortingHelper = function(techArray){
  var objectMap = {};
  for(var i = 0; i < techArray.length; i++){
    for(var j = 0; j < techArray[i].technology.length; j++){
      var singleTechnology = techArray[i].technology[j];
      if (objectMap[singleTechnology]) {
        objectMap[singleTechnology].push(techArray[i].name);
      } else {
        objectMap[singleTechnology] = [techArray[i].name];
      }
    }
  }
  var filteredArray = [];
  for(var key in objectMap){
    
    if(objectMap[key].length >= 2) {
      filteredArray.push({name: key, companies: objectMap[key]});
    }
  }
  return filteredArray;
}

