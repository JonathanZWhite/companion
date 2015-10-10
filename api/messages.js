var config = require('../config/secrets');
var client = require('twilio')(config.accountSid, config.authToken);
var Promise = require('bluebird');
var keywords = require('../config/keywords');
var weather = require('../lib/weather');
var jokes = require('../lib/jokes');
var messages;

messages = {
    /**
     * ### Receive
     * receive messages
     */
    receive: function(object, options) {
        var body = object.Body.toLowerCase();
        var keyword = messages._identifyRequest(body);
        return messages._routeRequest(keyword).then(function(response) {
            messages._send(response);
        });
    },

    _send: function(message) {
        client.sendMessage({
            to: config.jonathanPhoneNumber,
            from: config.phoneNumber,
            body: message
        }, function(err, resp) {
            if (!err) {
                console.log(resp.from); // outputs "+14506667788"
                console.log(resp.body); // outputs "word to your mother."
            }
        });
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

    _routeRequest: function(keyword) {
        switch (keyword) {
            case 'weather':
                return weather.getToday();
            case 'jokes':
                return jokes.getJoke();
            default:
                console.log('NOTHING RECOGNIZED');
        }
    }
};

module.exports = messages;
