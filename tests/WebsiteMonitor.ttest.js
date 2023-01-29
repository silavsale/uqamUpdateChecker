// const request = require("request-promise");
// const cheerio = require("cheerio");
// const WebsiteChecker = require("../services/WebsiteMonitor");
// const Twilio = require("../services/Twilio");

// jest.mock("request-promise", () =>
//   jest.fn(() => Promise.resolve('<div class="example-class">test</div>'))
// );

// describe("WebsiteChecker", () => {
//   let websiteChecker;
//   let twilio;

//   beforeEach(() => {
//     twilio = {
//       sendSMS: jest.fn(),
//     };
//     websiteChecker = new WebsiteChecker(
//       twilio,
//       "http://example.com",
//       ".example-class"
//     );

//     console.log("twilio", twilio);
//   });

//   it("should check website for change", async () => {
//     await websiteChecker.check();
//     expect(twilio.sendSMS).toHaveBeenCalledWith(
//       process.env.PHONE_NUMBER,
//       "The information on the website has changed."
//     );
//   });

//   it("should not check website for change", async () => {
//     await websiteChecker.check();
//     await websiteChecker.check();
//     expect(twilio.sendSMS).toHaveBeenCalledTimes(1);
//   });
// });

// describe("checkWebsite", () => {
//   let websiteChecker;
//   beforeEach(() => {
//     const twilio = new Twilio("testSID", "testToken", "testPhone");
//     websiteChecker = new WebsiteChecker(twilio, "testUrl");
//   });

//   it("updates previousContent when website content changes", async () => {
//     const originalContent = websiteChecker.previousContent;
//     websiteChecker.check = jest.fn(() => {
//       websiteChecker.previousContent = "new content";
//     });
//     await checkWebsite();
//     expect(websiteChecker.previousContent).not.toEqual(originalContent);
//     expect(websiteChecker.previousContent).toEqual("new content");
//   });
// });
