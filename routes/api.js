var messagesController = require('../controllers/messages');
var api = require('../api');

module.exports = function(app, router) {
    // router.post('/messages/send', messagesController.send);
    // router.post('/messages/reply', messagesController.reply);
    router.post('/messages/receive', api.http(api.messages.receive));
};
