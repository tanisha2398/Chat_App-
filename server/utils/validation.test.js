var expect = require("expect");
const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    var str = 1234;
    var strin = isRealString(str);
    expect(strin).toBeFalsy();
  });
  it("should reject string with only spaces", () => {
    var str = "         ";
    var strin = isRealString(str);
    expect(strin).toBeFalsy();
  });
  it("should accept string with non-space character", () => {
    var str = "Tanisha";
    var strin = isRealString(str);
    expect(strin).toBeTruthy();
  });
});
