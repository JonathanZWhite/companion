var config = require('../config/index');
var request = require('superagent');
var Promise = require('bluebird');
var twillio = require('./twillio');
var photos;

var API500px = require('500px');
var api500px = new API500px(config.secrets.fivehundred);

photos = {
    /**
     * ### GetInspiration
     * Gets one inspiration photo
     */
    getInspiration: function() {
        return new Promise(function(resolve, reject) {
            api500px.photos.getPopular({
                'sort': 'created_at',
                'image_size': 4,
                'rpp': '1'
            }, function(err, resp) {
                return twillio.send({ body: photos._parsePhoto(resp) });
            });

        });
    },

    _parsePhoto: function(data) {
        console.log('LOOK', data.photos[0]);
        return {
            body: 'Hope this inspires you',
            mediaUrl: data.photos[0].images[0].url
        }
    }
};

module.exports = photos;
