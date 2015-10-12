/*jslint node: true */
'use strict';

var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var ArticleSchema = new Schema({
    title: String,
    provider: String,
    url: String
});

var DigestSchema = new Schema({
    created: { type : Date, default: Date.now },
    articles: [ArticleSchema]
});

module.exports = Promise.promisifyAll(mongoose.model('Digest', DigestSchema));
