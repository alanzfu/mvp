var apiHandler = require('./apiHandler.js');
var staticHandler = require('./requestHandler.js');

module.exports = function(app, express) {
  app.get('/api/companies', apiHandler.companies);
  app.post('/api/companies/technologies', apiHandler.technologies);
  
}