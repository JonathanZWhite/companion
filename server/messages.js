/*jslint node: true */
'use strict';

var config = require('./config/secrets');
var client = require('twilio')(config.accountSid, config.authToken);
var lang = require('./config/lang');
var Levenshtein = require('Levenshtein');

/**
 * Messages object that acts as a library for all
 * messaging related actions. Some functions are private
 * others are exposed to the controller
 */
(function(Messages) {

    Messages.send = send;
    Messages.reply = reply;

    function send(to, message, callback) {
        if (!callback) callback = function() {};

        client.sendMessage({
            to: to,
            from: config.phoneNumber,
            body: message
        }, function(err, resp) {
            if (!err) {
                console.log(resp.from); // outputs "+14506667788"
                console.log(resp.body); // outputs "word to your mother."
            }

            return callback({
                status: true,
                resp: resp
            });
        });
    }

    function reply(payload) {
        var from = payload.From;
        var message = payload.Body;

        // TODO: random chance to send Ryan or Jonathan
        if (from !== config.jonathanPhoneNumber && from !== config.ryanPhoneNumber) {
            send(config.jonathanPhoneNumber, from + ': ' + message);
        }

        _replyManager(from, message);
    }

    function _replyManager(from, message) {
        var messageArray = message.toLowerCase().split(' ');
        var remindMePattern = new Levenshtein('remindme', message.toLowerCase());

        // checks if intro
        if (remindMePattern.distance <= 1) {
            send(from, lang.intro);
        }

        // checks if ADMIN paths
        if (messageArray[0] === 'admin') {
            switch (messageArray[1]) {
                // format: ADMIN SEND 7703297606: Hello world!
                case 'send':
                    console.log('Admin command: send');
                    send(messageArray[2], message.substring(message.indexOf(':') + 1));
                    break;
            }
        }
    }
}(exports));
