/*jslint node: true */
'use strict';

var messagesLib = require('../messages');
var messagesController = {};

messagesController.send = send;
messagesController.reply = reply;

function send(req, res) {
    messagesLib.send(req.body.to, req.body.message, function(resp) {
        res.send(resp);
    });
}

function reply(req, res) {
    messagesLib.reply(req.body, function(resp) {
        res.send(resp);
    });
}

module.exports = messagesController;
