var digest;
var Promise = require('bluebird');
var DigestSchema = require('../models/digest');
var Digest = require('../lib/digest');

digest = {
    getFeed: function() {
        return DigestSchema
            .find({})
            .sort({ 'created': 'desc' })
            .limit(1)
            .execAsync();
    },

    generate: function() {
        return Digest.generate();
    }
};

module.exports = digest;
