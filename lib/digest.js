var config = require('../config/index');
var request = require('superagent');
var Promise = require('bluebird');
var hackerNews = require("node-hacker-news")();
var digest;

digest = {
    /**
     * GetJoke
     * gets a joke
     */
    get: function() {
        hackerNews.getHottestItems(2, function(error, items) {
            console.log('THESE ARE THE HOTTEST ITEMS', items);
        });
    },

    parseHackerNews: function(data) {
        var articles = [];
        data.forEach(function(article) {
            articles.push({
                title: article.title,
                provider: 'Hacker News',
                url: article.url
            });
        });
    }
};

module.exports = digest;
