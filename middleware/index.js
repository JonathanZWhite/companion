var bodyParser = require('body-parser');
var config = require('../config/secrets');
var cors = require('cors');

module.exports = function(app) {
    // configuration
    app.set('port', config.port);

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '900mb' }));
};
