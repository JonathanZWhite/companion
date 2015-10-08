var Promise = require('bluebird');
var messages;

messages = {
    /**
     * ### Receive
     * receive messages
     */
    receive: function(object, options) {
        return new Promise(function(resolve, reject) {
            resolve(true);
        });
    }
};

module.exports = messages;
