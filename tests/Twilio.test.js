const Twilio = require("../services/Twilio");
const twilio = require("twilio");

jest.mock("twilio");

describe("Twilio Class", () => {
  let twilioInstance;

  beforeEach(() => {
    twilio.mockClear();
    twilioInstance = new Twilio("fake-sid", "fake-token", "fake-phone");
  });

  it("Should create an instance of the Twilio client", () => {
    expect(twilio).toHaveBeenCalledWith("fake-sid", "fake-token");
    expect(twilioInstance.client).toBeDefined();
  });

  it("Should send a SMS successfully", async () => {
    const smsMessageResultMock = {
      sid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      status: "sent",
      errorCode: null,
      errorMessage: null,
    };

    twilioInstance.client.messages = {
      create: jest.fn(),
    };

    twilioInstance.client.messages.create.mockResolvedValue({
      ...smsMessageResultMock,
    });

    const resultPromise = twilioInstance.sendSMS(
      "(555) 555-5555",
      "lorem-ipsum"
    );
    await expect(resultPromise).resolves.not.toThrowError();
    expect(await resultPromise).toEqual(smsMessageResultMock.sid);
  });

  it("Should throw an error if the SMS fails to send", async () => {
    const smsMessageMock = {
      sid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      status: "failed",
      errorCode: 123,
      errorMessage: "lorem-ipsum",
    };

    twilioInstance.client.messages = {
      create: jest.fn(),
    };

    twilioInstance.client.messages.create.mockResolvedValue({
      ...smsMessageMock,
    });

    const resultPromise = twilioInstance.sendSMS(
      "(555) 555-5555",
      "lorem-ipsum"
    );
    await expect(resultPromise).rejects.toThrowError(
      `Failed to send sms message. Error Code: ${smsMessageMock.errorCode} / Error Message: ${smsMessageMock.errorMessage}`
    );
  });
});
