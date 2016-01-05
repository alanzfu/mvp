var path = require('path');

var db = require(path.join(__dirname,'../../db.js'));
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
            if(match.rowCount === 0){
                //insert unfound company into company table
                db.query("INSERT INTO company (name, count) values ('"+companyList[x]+"',0)", function(err,res){
                  //find related tech of the new company
                  archive.scrapeTech(companyList[x],function(arr){
                    var techStep = function(y){
                      if(y < arr.length){
                        //put it into the database
                        db.query("INSERT INTO combos (companyName, technologyName) values ('"+companyList[x]+"'," + "'"+arr[y]+"')", function(err,res){
                          if(err){
                            console.log('err insert into combos');
                          }
                          if(y+1 >= arr.length){
                            db.query("SELECT technologyName FROM combos WHERE companyName='"+companyList[x]+"'",function(err,arr){
                              allTechnologies.push({name:companyList[x], technology:arr.rows});
                              db.query("UPDATE company SET count = count + 1 WHERE name='"+companyList[x]+"'", function(err,res){
                                if(err){
                                  console.log('error updating company count');
                                }
                                step(x+1);  
                              });
                            });
                          }
                          techStep(y+1);  
                        })
                      }
                    }
                    techStep(0);
                    
                  });
                  if(err) throw err;
                });
              
            }
            else{
              //archive.scrapeTech replaced with a db.query, but the query would still be pushed to all tech
              db.query("SELECT technologyName FROM combos WHERE companyName='"+companyList[x]+"'",function(err,arr){
                allTechnologies.push({name:companyList[x], technology:arr.rows});
                db.query("UPDATE company SET count = count + 1 WHERE name='"+companyList[x]+"'", function(err,res){
                  if(err){
                    console.log('error updating company count');
                  }
                  step(x+1);  
                });
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
      var singleTechnology = techArray[i].technology[j].technologyname;
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

