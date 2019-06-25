var moment = require("moment");
var generateMessage = (from, text, image) => {
  return {
    from,
    text,
    image,
    createdAt: moment().valueOf()
  };
};
var generateAdminMessage = text => {
  return {
    text,
    createdAt: moment().valueOf()
  };
};
var generateLocationMessage = (from, image, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    image,
    createdAt: moment().valueOf()
  };
};
module.exports = {
  generateMessage,
  generateAdminMessage,
  generateLocationMessage
};
