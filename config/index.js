module.exports = {
    local: {
        port: 3000,
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?APPID=e4b235bd79cec28cf3d11b98a692d209&',
            jokes: 'https://www.reddit.com/r/Jokes/random.json'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE'
        }
    },
    production: {
        port: 80,
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?APPID=e4b235bd79cec28cf3d11b98a692d209&',
            jokes: 'https://www.reddit.com/r/Jokes/random.json'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE'
        }
    }
}[process.env.NODE_ENV || 'development'];
