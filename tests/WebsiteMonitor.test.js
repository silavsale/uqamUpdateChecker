const request = require("request-promise");
const cheerio = require("cheerio");
const WebsiteChecker = require("../services/WebsiteMonitor");

jest.mock("request-promise", () =>
  jest.fn(() => Promise.resolve('<div class="example-class">test</div>'))
);

describe("WebsiteChecker", () => {
  let websiteChecker;
  let twilio;

  beforeEach(() => {
    twilio = {
      sendSMS: jest.fn(),
    };
    websiteChecker = new WebsiteChecker(
      twilio,
      "http://example.com",
      ".example-class"
    );
  });

  it("should check website for change", async () => {
    await websiteChecker.check();
    expect(twilio.sendSMS).toHaveBeenCalledWith(
      process.env.PHONE_NUMBER,
      "The information on the website has changed."
    );
  });

  it("should not check website for change", async () => {
    await websiteChecker.check();
    await websiteChecker.check();
    expect(twilio.sendSMS).toHaveBeenCalledTimes(1);
  });
});
