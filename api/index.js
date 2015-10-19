var _ = require('lodash-node');
var digest = require('./digest');
var messages = require('./messages');
var notes = require('./notes');
var logger = require('../lib/logger');

/**
 * ### HTTP
 *
 * Decorator for API functions which are called via an HTTP request. Takes the API method and wraps it so that it gets
 * data from the request and returns a sensible JSON response.
 *
 * @public
 * @param {Function} apiMethod API method to call
 * @return {Function} middleware format function to be called by the route when a matching request is made
 */
function http(apiMethod) {
    return function apiHandler(req, res, next) {
        console.log('apiHandler on the job');

        // We define 2 properties for using as arguments in API calls:
        var object = req.body;
        var options = _.extend({}, req.files, req.query, req.params);

        // If this is a GET, or a DELETE, req.body should be null, so we only have options (route and query params)
        // If this is a PUT, POST, or PATCH, req.body is an object
        if (_.isEmpty(object)) {
            object = options;
            options = {};
        }

        return apiMethod(object, options).then(function(response) {
                // Send a properly formatted HTTP response containing the data with correct headers
                logger.log('info', 'this is the response ' + response);
                res.json(response);

            })
            .catch(next)
            .error(function(err) {
                // operational error
                logger.log('error', 'There was an error: ' + err);
                next(err);
            });

        // return apiMethod(object, options);
    };
}

module.exports = {
    http: http,
    messages: messages,
    digest: digest,
    notes: notes
};
