var twillio = require('./twillio');
var NoteSchema = require('../models/note');
var Promise = require('bluebird');
var notes;

notes = {
    createNote: function(data) {
        console.log('Creating note...');
        data = data.replace('note:', '');
        return NoteSchema.create({ body: data })
            .then(function() {
                return Promise.resolve('Beautiful! I\'ll get this stored right away (୨୧ ❛ᴗ❛)✧');
            });
    },
    writeEveryDayReminder: function() {
        twillio.send({ body: 'Oi! You should write something everyday! Prefix your message with \'note:\' and I\'ll make sure to save whatever you write! ⊂( ・ ̫・)⊃' });
    }
};

module.exports = notes;
