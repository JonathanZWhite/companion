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

var NoteSchema = new Schema({
    created: { type : Date, default: Date.now },
    body: String
});

module.exports = mongoose.model('Note', NoteSchema);
