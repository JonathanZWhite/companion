var config = require('../config/index');
var moment = require('moment');
var Promise = require('bluebird');
var hackerNews = Promise.promisifyAll(require("node-hacker-news")());
var request = Promise.promisifyAll(require('request'));
var DigestSchema = require('../models/digest');
var limit = 2;
var digest;

digest = {
    /**
     * GetJoke
     * gets a joke
     */
    get: function() {
        Promise.join(
            digest._getHackerNews(),
            digest._getDesignerNews(),
            digest._getMedium(),
            function(hackerNews, designerNews, medium) {
            var digestDoc = { articles: [] };
            digestDoc.articles = digestDoc.articles.concat(hackerNews, designerNews, medium);
            DigestSchema.create(digestDoc);
        });
    },

    _getHackerNews: function() {
        return hackerNews
            .getHottestItemsAsync(2)
            .then(function(resp) {
                return digest._parseHackerNews(resp);
            });
    },

    _getDesignerNews: function() {
        return request
            .getAsync(config.api.designerNews)
            .spread(function(res, body) {
                return digest._parseDesignerNews(body);
            });
    },

    _getMedium: function() {
        return request
            .getAsync('https://medium.com?format=json')
            .spread(function(res, body) {
                return digest._parseMedium(body);
            });
    },

    _parseHackerNews: function(data) {
        var articles = [];
        data.forEach(function(article) {
            articles.push({
                title: article.title,
                provider: 'Hacker News',
                url: article.url
            });
        });
        return articles.slice(0, limit);
    },

    _parseDesignerNews: function(data) {
        data = JSON.parse(data);
        var articles = [];

        data.stories.forEach(function(article) {
            articles.push({
                title: article.title,
                provider: 'Designer News',
                url: article.url.replace('click/') // links to DN instead of article
            });
        });
        return articles.slice(0, limit);
    },

    _parseMedium: function(data) {
        var articles = [];
        var dateCreated;
        data = JSON.parse(data.replace('])}while(1);</x>', ''));

        data.payload.value.forEach(function(article) {
            dateCreated = moment(article.createdAt);
            if (dateCreated.diff(Date.now(), 'days') >= -1) {
                articles.push({
                    title: article.title,
                    provider: 'Medium',
                    url: 'https://medium.com/' + article.homeCollectionId + '/' + article.uniqueSlug
                });
            }
        });
        return articles.slice(0, limit);
    }
};

module.exports = digest;
