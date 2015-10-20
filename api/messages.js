var config = require('../config');
var client = require('twilio')(config.secrets.twillio.accountSid, config.secrets.twillio.authToken);
var Promise = require('bluebird');
var keywords = require('../config/keywords');
var digest = require('../lib/digest');
var weather = require('../lib/weather');
var jokes = require('../lib/jokes');
var notes = require('../lib/notes');
var photos = require('../lib/photos');
var twillio = require('../lib/twillio');
var messages;

messages = {
    /**
     * ### Receive
     * receive messages
     */
    receive: function(object, options) {
        var body = object.Body.toLowerCase();
        var keyword = messages._identifyRequest(body);
        // return messages._routeRequest(keyword, body).then(function(response) {
        //     if (typeof response === 'object') messages._send(response);
        //     else messages._send({ body: response });
        // });

        return messages._routeRequest(keyword, body);
    },

    _send: function(payload) {
        twillio.send(payload);
    },

    _identifyRequest: function(body) {
        var keyword;
        for (var key in keywords) {
            var index = 0;
            while (index < keywords[key].length && !keyword) {
                if (body.indexOf(keywords[key][index]) > -1) keyword = key;
                index++;
            }
        }
        return keyword;
    },

    _routeRequest: function(keyword, body) {
        switch (keyword) {
            case 'weather':
                return weather.getToday();
            case 'jokes':
                return jokes.getJoke();
            case 'photos':
                return photos.getInspiration();
            case 'digest':
                return digest.get();
            case 'notes':
                return notes.createNote(body);
            case 'links':
                return Promise.resolve('I\'ll only do this once (¬_¬) ' + config.hosts.client + 'notes');
            default:
                return Promise.resolve('Sorry... I\'m not too smart yet. I don\'t know what you want me to do (っ- ‸ – ς)');
        }
    }
};

module.exports = messages;
