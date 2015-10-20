var config = require('../config');
var moment = require('moment');
var Promise = require('bluebird');
var hackerNews = Promise.promisifyAll(require("node-hacker-news")());
var request = Promise.promisifyAll(require('request'));
var DigestSchema = require('../models/digest');
var twillio = require('./twillio');
var limit = 4;
var digest;

digest = {

    get: function() {
        return digest.generate()
            .then(function() {
                return twillio.send({ body: 'Ciao! Here\'s your digest ' + config.hosts.client + 'digest' });
            });
    },

    generate: function() {
        return Promise.join(
            digest._getProductHunt(),
            digest._getHackerNews(),
            digest._getDesignerNews(),
            digest._getMedium(),
            digest._getNewYorkTimes(),
            function(productHunt, hackerNews, designerNews, medium, newYorkTimes) {
                var digestDoc = { articles: [] };
                digestDoc.articles = digestDoc.articles.concat(productHunt, hackerNews, designerNews, medium, newYorkTimes);
                DigestSchema.create(digestDoc);
            }
        );
    },

    _getProductHunt: function() {
        return request
            .getAsync(config.api.productHunt + 'posts?access_token=' + config.secrets.productHunt.token)
            .spread(function(res, body) {
                return digest._parseProductHunt(body);
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

    _getNewYorkTimes: function() {
        return request
            .getAsync(config.api.newYorkTimes + 'world.json?api-key=' + config.secrets.newYorkTimes.key)
            .spread(function(res, body) {
                return digest._parseNewYorkTimes(body);
            });
    },

    _parseProductHunt: function(data) {
        var articles = [];
        data = JSON.parse(data);
        data.posts.forEach(function(article) {
            articles.push({
                title: article.name,
                provider: 'Product Hunt',
                url: article.discussion_url
            });
        });
        return articles.slice(0, limit);
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
        var articles = [];
        data = JSON.parse(data);

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
    },

    _parseNewYorkTimes: function(data) {
        data = JSON.parse(data);
        var articles = [];
        data.results.forEach(function(article) {
            articles.push({
                title: article.title,
                provider: 'New York Times',
                url: article.url
            });
        });
        return articles.slice(0, limit);
    }
};

module.exports = digest;
