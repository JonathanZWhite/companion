module.exports = {
    local: {
        port: 3000,
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?',
            jokes: 'https://www.reddit.com/r/Jokes/random.json'
        }
    },
    production: {
        port: 80
    }
}[process.env.NODE_ENV || 'development'];
