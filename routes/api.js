var api = require('../api');

module.exports = function(app, router) {
    // TEXT CLIENT
    router.post('/messages/receive', api.http(api.messages.receive));

    // WEB CLIENT
    router.get('/digest/feed', api.http(api.digest.getFeed)); // gets latest digest json
    router.get('/digest/generate', api.http(api.digest.generate));

    router.get('/notes', api.http(api.notes.getNotes)); // gets notes json
};
