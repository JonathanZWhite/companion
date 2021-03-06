var config = require('../config/index');
var request = require('superagent');
var Promise = require('bluebird');
var twillio = require('./twillio');
var jokes;

jokes = {
    /**
     * GetJoke
     * gets a joke
     */
    getJoke: function() {
        return new Promise( function(resolve, reject) {
            request
                .get(config.api.jokes)
                .end(function(err, resp) {
                    return twillio.send({ body: jokes._parseJoke(resp.body) });
                });
        });
    },

    _parseJoke: function(data) {
        return 'Joke time! ' +
            data[0].data.children[0].data.title + ' ' +
            data[0].data.children[0].data.selftext;
    }
};

module.exports = jokes;
