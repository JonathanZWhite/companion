var config = require('../config/index');
var Promise = require('bluebird');
var CronJob = require('cron').CronJob;
var digest = require('./digest');
var Notes = require('./notes');
var timeZone = 'America/New_York';
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
        // send what have you written today?
        new CronJob('00 30 8 * * *', function() {
            Digest.generate('scheduled');
        }, null, true, timeZone);

        new CronJob('00 00 20 * * *', function() {
            Notes.writeEveryDayReminder();
        }, null, true, timeZone);
    }
};

module.exports = scheduler;
