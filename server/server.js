const path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");
const { generateMessage } = require("./utils/message");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 3009;
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));
io.on("connection", socket => {
  console.log("new user connected");

  socket.emit("newMessage", generateMessage("Admin", "Welcome to chat app"));
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "NEw user joined")
  );
  socket.on("createMessage", newmsg => {
    console.log("createMessage", newmsg);
    io.emit("newMessage", generateMessage(newmsg.from, newmsg.text));
    // socket.broadcast.emit("newMessage", {
    //   from: newmsg.from,
    //   text: newmsg.text,
    //   createdAt: new Date().getTime()
    // });
  });
  socket.on("disconnect", () => {
    console.log("new user disconnected");
  });
});
server.listen(port, () => {
  console.log(`server started at port ${port}`);
});
