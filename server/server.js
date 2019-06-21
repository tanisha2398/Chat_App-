const path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 3009;
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));
io.on("connection", socket => {
  console.log("new user connected");

  socket.emit("newMessage", {
    from: "Tanisha",
    text: "How are u doing ",
    createdAt: 1234
  });

  socket.on("createMessage", newmsg => {
    console.log("createMessage", newmsg);
  });
  socket.on("disconnect", () => {
    console.log("new user disconnected");
  });
});
server.listen(port, () => {
  console.log(`server started at port ${port}`);
});
