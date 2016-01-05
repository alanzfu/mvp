var express = require('express');
var bodyParse = require('body-parser');
var cors = require('cors');
var path = require('path')


var app = express();
require('./db.js');
app.use(bodyParse.json());
require('./routes.js')(app, express);


app.use(cors());


app.use('/',express.static(path.join(__dirname,'/public')));

app.listen(process.env.PORT || 3000);