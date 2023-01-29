require("dotenv").config();
const Twilio = require("./twilio");
const WebsiteChecker = require("./websiteChecker");

const twilio = new Twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
  process.env.TWILIO_PHONE
);
const websiteChecker = new WebsiteChecker(twilio, process.env.WEBSITE_URL);

websiteChecker.check();
