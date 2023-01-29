const twilio = require("twilio");

class Twilio {
  constructor(sid, token, phone) {
    this.client = new twilio(sid, token);
    this.phone = phone;
  }

  initializeClient() {
    this.client = new twilio(this.sid, this.token);
  }

  sendSMS(to, body) {
    return new Promise((resolve, reject) => {
      this.client.messages
        .create({
          body: body,
          from: this.phone,
          to: to,
        })
        .then((message) => {
          if (message.errorCode === null) {
            resolve(message.sid);
          } else {
            reject(
              new Error(
                `Failed to send sms message. Error Code: ${message.errorCode} / Error Message: ${message.errorMessage}`
              )
            );
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Twilio;
