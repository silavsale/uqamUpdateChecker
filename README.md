- Website checker

This app is created to check data in a particular place on the website and send notification messages (sms) to users if the information on the website was updated.

#

It use `twilio.com` free account to send text message.

###

`app.js` is the entry point.

You can set the frequency with which to make a request inside `checkWebsite()` function.

You need to provide environment variables to successfully use this app.

Create .env file and populate variables with your Twilio credentials

`TWILIO_SID`
`TWILIO_TOKEN`
`TWILIO_PHONE`
`PHONE_NUMBER`
`WEBSITE_URL`
`CLASS_NAME`

You can use a process manager like `pm2` to constanly run this app on server.
