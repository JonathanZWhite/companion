module.exports = {
    development: {
        port: 3000,
        mongo: process.env.MONGODB || 'mongodb://localhost:27017/companion',
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?APPID=e4b235bd79cec28cf3d11b98a692d209&',
            jokes: 'https://www.reddit.com/r/Jokes/random.json',
            designerNews: 'https://www.designernews.co/?format=json',
            medium: 'https://medium.com',
            productHunt: 'https://api.producthunt.com/v1/'
        },
        hosts: {
            self: 'http://localhost:3000/',
            client: 'http://localhost:9000/'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE',
            productHunt: {
                token: '77da2bb84129cdd06d7809c98c508de8cf1fb128fbaea3d0761dabfad4a0462a',
                key: '09290d0ecbb38d9881728d07b5ab64a1230681dde69be98850a20ade66be6973',
                secret: '054bf2aa474418d291020b1aedccd7633d17a9a20b338dcbc9569be476f05215'
            },
            twillio: {
                accountSid: 'ACc51b59e56e3c7a9c5a666e6458b55f0d',
                authToken: '24a78fa77ede420db8901b584036909f',
                phoneNumber: '+16787838456',
                jonathanPhoneNumber: '+17703297606'
            }
        }
    },
    production: {
        port: 80,
        mongo: process.env.MONGODB || 'mongodb://localhost:27017/companion',
        api: {
            weather: 'http://api.openweathermap.org/data/2.5/weather?APPID=e4b235bd79cec28cf3d11b98a692d209&',
            jokes: 'https://www.reddit.com/r/Jokes/random.json',
            designerNews: 'https://www.designernews.co/?format=json',
            medium: 'https://medium.com/top-stories?format=json',
            productHunt: 'https://api.producthunt.com/v1/'
        },
        hosts: {
            self: 'http://api.usecompanion.com/',
            client: 'http://usecompanion.com/'
        },
        secrets: {
            fivehundred: 'fvBwAoIcjbY59JuTcarJJNFWffYeD5l3lWIkBOBE',
            productHunt: {
                token: '77da2bb84129cdd06d7809c98c508de8cf1fb128fbaea3d0761dabfad4a0462a',
                key: '09290d0ecbb38d9881728d07b5ab64a1230681dde69be98850a20ade66be6973',
                secret: '054bf2aa474418d291020b1aedccd7633d17a9a20b338dcbc9569be476f05215'
            },
            twillio: {
                accountSid: 'ACc51b59e56e3c7a9c5a666e6458b55f0d',
                authToken: '24a78fa77ede420db8901b584036909f',
                phoneNumber: '+16787838456',
                jonathanPhoneNumber: '+17703297606'
            }
        }
    }
}[process.env.NODE_ENV || 'development'];
