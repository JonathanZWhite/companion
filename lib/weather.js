var config = require('../config/index');
var request = require('superagent');
var Promise = require('bluebird');
var twillio = require('./twillio');
var querystring = require('querystring');
var weather;

weather = {
    /**
     * ### GetToday
     * gets today's weather
     */
    getToday: function() {
        return new Promise(function(resolve, reject) {
            request
                .get(config.api.weather + querystring.stringify({ q: 'atlanta', units: 'imperial' }))
                .end(function(err, resp) {
                    return twillio.send({ body: weather._parseTodayWeather(resp.body) });
                });
        });
    },

    _parseTodayWeather: function(data) {
        var description = data.weather[0].description;
        var tempCurr = data.main.temp;
        var tempMin = data.main.temp_min;
        var tempMax = data.main.temp_max;
        return 'This is what the weather man says: ' + description + ', ' +
            'currently ' + tempCurr + ', ' +
            'with a high of ' + tempMax + ' ' +
            'and a low of ' + tempMin;
    }
};

module.exports = weather;
