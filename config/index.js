module.exports = {
    local: {
        port: 3000,
        mongo: process.env.MONGODB || 'mongodb://localhost:27017/companion',
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?APPID=e4b235bd79cec28cf3d11b98a692d209&',
            jokes: 'https://www.reddit.com/r/Jokes/random.json',
            designerNews: 'https://www.designernews.co/?format=json',
            medium: 'https://medium.com'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE'
        }
    },
    production: {
        port: 80,
        mongo: process.env.MONGODB || 'mongodb://localhost:27017/companion',
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?APPID=e4b235bd79cec28cf3d11b98a692d209&',
            jokes: 'https://www.reddit.com/r/Jokes/random.json',
            designerNews: 'https://www.designernews.co/?format=json',
            medium: 'https://medium.com/top-stories?format=json'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE'
        }
    }
}[process.env.NODE_ENV || 'development'];
