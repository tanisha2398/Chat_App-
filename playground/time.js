var moment = require("moment");
// var date = new Date();
// var months=['jan','feb'];
// console.log(date.getMonth());
// new Date().getTime()
var somtimestamp = moment().valueOf();
console.log(somtimestamp);
var createdAt = 1234;
var date = moment(somtimestamp);
// date.add(1, "year").subtract(9, "months ");
// console.log(date.format("MMM Do, YYYY"));
console.log(date.format("h:mm a"));
