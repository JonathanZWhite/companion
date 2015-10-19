var NoteSchema = require('../models/note');
var Promise = require('bluebird');
var notes = require('../lib/notes');

notes = {
    getNotes: function() {
        return NoteSchema
            .find({})
            .sort({ 'created': 'desc' })
            .execAsync();
    }
};

module.exports = notes;
