var express = require('express');
var middleware = require('./middleware');
var routes = require('./routes');
var db = require('./db');
var app = express();
var scheduler = require('./lib/scheduler');

scheduler.init();
db();
middleware(app);
routes(app);

app.listen(app.get('port'), function() {
    console.info("==> 🌎  Listening on port %s.", app.get('port'));
});

module.exports = app;
