var express = require('express');


var app = express();
require('./routes.js')(app, express);

app.listen(process.env.PORT || 3000);