module.exports = {
    local: {
        port: 3000,
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?',
            jokes: 'https://www.reddit.com/r/Jokes/random.json'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE'
        }
    },
    production: {
        port: 80,
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?',
            jokes: 'https://www.reddit.com/r/Jokes/random.json'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE'
        }
    }
}[process.env.NODE_ENV || 'development'];
