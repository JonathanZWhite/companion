var messagesController = require('../controllers/messages');

module.exports = function(app, router) {
    router.post('/messages/send', messagesController.send);
    router.post('/messages/reply', messagesController.reply);
};
