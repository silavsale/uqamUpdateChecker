const twilio = require("twilio");

class Twilio {
  constructor(sid, token, phone) {
    this.client = new twilio(sid, token);
    this.phone = phone;
  }
  sendSMS(to, body) {
    console.log("to", to);
    console.log("body", body);
    this.client.messages.create({
      body: body,
      from: this.phone,
      to: to,
    });
  }
}

module.exports = Twilio;
