var config = require('../config');
var client = require('twilio')(config.secrets.twillio.accountSid, config.secrets.twillio.authToken);
var Promise = require('bluebird');
var keywords = require('../config/keywords');
var digest = require('../lib/digest');
var weather = require('../lib/weather');
var jokes = require('../lib/jokes');
var photos = require('../lib/photos');
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
            if (typeof response === 'object') messages._send(response);
            else messages._send({ body: response });
        });

        // return messages._routeRequest(keyword);
    },

    _send: function(payload) {
        var options = {
            to: config.secrets.twillio.jonathanPhoneNumber,
            from: config.secrets.twillio.phoneNumber,
            body: payload.body
        };

        if (payload.mediaUrl) options.mediaUrl = payload.mediaUrl;

        client.sendMessage(options, function(err, resp) {
            console.log(err);
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
            case 'photos':
                return photos.getInspiration();
            case 'digest':
                return digest.get();
            default:
                console.log('NOTHING RECOGNIZED');
        }
    }
};

module.exports = messages;
