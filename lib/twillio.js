var config = require('../config');
var client = require('twilio')(config.secrets.twillio.accountSid, config.secrets.twillio.authToken);
var twillio;

twillio = {
    send: function(payload) {
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
    }
};

module.exports = twillio;
