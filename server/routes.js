var apiHandler = require('./apiHandler.js');

module.exports = function(app, express) {
  app.get('/api/companies', apiHandler.companies);
  app.post('/api/companies/technologies', apiHandler.technologies);
}