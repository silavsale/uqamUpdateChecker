require("dotenv").config();
const Twilio = require("./services/Twilio");
const WebsiteChecker = require("./services/WebsiteMonitor");

const twilio = new Twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
  process.env.TWILIO_PHONE
);

const websiteChecker = new WebsiteChecker(twilio, process.env.WEBSITE_URL);

function checkWebsite() {
  websiteChecker.check();
  setTimeout(checkWebsite, 3600000);
}

checkWebsite();
