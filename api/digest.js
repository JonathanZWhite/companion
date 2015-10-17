var digest;
var Promise = require('bluebird');
var DigestSchema = require('../models/digest');

digest = {
    getFeed: function() {
        return DigestSchema
            .find({})
            .sort({ 'created': 'desc' })
            .limit(1)
            .execAsync();
    }
};

module.exports = digest;
