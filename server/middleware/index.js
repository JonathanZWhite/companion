var bodyParser =    require('body-parser');
var config =        require('../config/secrets');

module.exports = function(app) {
    // configuration
    app.set('port', config.port);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '900mb' }));
};
