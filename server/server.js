const path = require("path");
var express = require("express");
var app = express();

const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.listen(3009, () => {
  console.log("server started at port 3006");
});
