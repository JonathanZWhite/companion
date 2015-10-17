/*jslint node: true */
'use strict';

var Promise = require('bluebird');
var mongoose =  Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    provider: String,
    url: String
});

var DigestSchema = new Schema({
    created: { type : Date, default: Date.now },
    articles: [ArticleSchema]
});

// module.exports = Promise.promisifyAll(mongoose.model('Digest', DigestSchema));
module.exports = mongoose.model('Digest', DigestSchema);
