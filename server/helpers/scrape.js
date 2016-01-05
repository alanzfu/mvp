//Modules Required
var request = require('request');

//Given URL, and Company Id
exports.scrapeTech = function(companyName, callback){
  request('http://www.stackshare.io/' + companyName + '/' + companyName + '/', function(err, res, body){
    if(err) {
      throw err;
    }

    //THIS SHOULD BE REGEX LATER
    var technologies = exports.parseHTMLForTechnologies(body, callback);
    
  })
  
}


exports.parseHTMLForTechnologies = function(htmlString, callback){

  var technologyArr = htmlString.split('<a class="stack-service-name-under" href="/');
  technologyArr.shift(); //deletes preceding html
  technologyArr.pop(); //deletes proceeding html
  
  for (var i = 0; i < technologyArr.length; i++ ) {
    var technology = technologyArr[i];
    //there is a trailing " after the technology within the html, splitting allows us to get rid of the rest
    technology = technology.split('"'); 
    technology.pop();
    technologyArr[i] = technology[0];
  }
  callback(technologyArr);
  return technologyArr;
}
