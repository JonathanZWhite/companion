var mongoose = require('mongoose');
var config = require('../config');

module.exports = function() {
	mongoose.connect(config.mongo, function(err) {
		if (err) { console.error('Could not establish connection with MongoDB' + err); }
	});
};
