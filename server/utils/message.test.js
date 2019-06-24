var expect = require("expect");
var {
  generateMessage,
  generateAdminMessage,
  generateLocationMessage
} = require("./message");
describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Tanisha";
    var text = "hi thats me ..";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});
describe("generateAdminMessage", () => {
  it("should generate correct admin message", () => {
    var text = "he joined";
    var message = generateAdminMessage(text);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ text });
  });
});
describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = "himmu";
    var latitude = 1;
    var longitude = 1;
    var url = "https://www.google.com/maps?q=1,1";
    var locationmessage = generateLocationMessage(from, latitude, longitude);
    expect(typeof locationmessage.createdAt).toBe("number");
    expect(locationmessage).toMatchObject({ from, url });
  });
});
