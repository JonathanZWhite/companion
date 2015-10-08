#RemindMe

###Prerequisites
- [Node](https://nodejs.org/)
- [Ngrok](https://ngrok.com/download)

###Starting the API server
This starts the API server, using Ngrok to expose the connection.
```
$ cd /server
$ npm install
$ nodemon app.js
$ cd /path/to/ngrok
$ ./ngrok http 3000
```
Finally, visit `http://localhost:3000` and check `/server/routes/api` for available routes.

###FAQ
#####What does Ngrok do?
Ngrok allows you to test Twilio webhooks locally. For example, whenever someone sends a text to Twilio, a `POST` is sent to an endpoint, that is specified in the Twilio [configuration panel](https://www.twilio.com/user/account/phone-numbers/PN9545bf91f21167700634827df3e3ab6c). In other words, Ngrok exposes your local web server usually found on `http://localhost:3000` on a dynamically generated url like `http://44fa899c.ngrok.io` so that anyone on the web can access this endpoint, most importantly the Twilio server.
