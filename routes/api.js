var api = require('../api');

module.exports = function(app, router) {
    router.post('/messages/receive', api.http(api.messages.receive));
    // gets latest digest json
    router.get('/digest/feed', api.http(api.digest.getFeed));
};
