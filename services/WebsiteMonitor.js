require("dotenv").config();
const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios");

class WebsiteChecker {
  constructor(twilio, url) {
    this.twilio = twilio;
    this.url = url;
    this.previousContent = "";
  }

  async check() {
    // console.log("check()");
    // console.log("check() this.url", this.url);
    // console.log("check() this.previousContent", this.previousContent);

    try {
      const response = await axios.get(this.url);
      const data = response.data;

      let $ = cheerio.load(data);

      const information = $(process.env.CLASS_NAME).text();

      console.log("check() information", information);
      console.log("check() process.env.PHONE_NUMBER", process.env.PHONE_NUMBER);
      if (information !== this.previousContent) {
        this.twilio.sendSMS(
          process.env.PHONE_NUMBER,
          `The information on the website has changed. ${information}`
        );
        this.previousContent = information;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = WebsiteChecker;
