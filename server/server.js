const path = require("path");
var express = require("express");
var app = express();
var port = process.env.PORT || 3009;
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
