var express =               require('express');
var router =                express.Router();

module.exports = function(app) {
    app.use('/', router);
    require('./api')(app, router);
};
