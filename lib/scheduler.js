var config = require('../config/index');
var Promise = require('bluebird');
var CronJob = require('cron').CronJob;
var digest = require('./digest');
var notes = require('./notes');
var weather = require('./weather');
var jokes = require('./jokes');
var photos = require('./photos');
var timeZone = 'America/New_York';
var twillio = require('../lib/twillio');
var scheduler;

/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/

scheduler = {
    init: function() {
        new CronJob('00 30 7 * * *', function() {
            digest.get();
        }, null, true, timeZone);

        new CronJob('00 00 8 * * *', function() {
            weather.getToday();
        }, null, true, timeZone);

        new CronJob('0 */2 * * *', function() {
            jokes.getJoke();
        }, null, true, timeZone);

        new CronJob('0 */3 * * *', function() {
            photos.getInspiration();
        }, null, true, timeZone);

        new CronJob('00 00 20 * * *', function() {
            notes.writeEveryDayReminder();
        }, null, true, timeZone);
    }
};

module.exports = scheduler;
