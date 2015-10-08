/*jslint node: true */
'use strict';

var express = 		require('express');
var middleware = 	require('./middleware');
var routes = 		require('./routes');

var app = express();

middleware(app);
routes(app);

app.listen(app.get('port'), function() {
	console.log('Express listening to port', app.get('port'));
});

module.exports = app;
