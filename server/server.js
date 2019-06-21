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
    from: "Admin",
    text: "Welcome to chat app",
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "new user joined",
    createdAt: new Date().getTime()
  });
  socket.on("createMessage", newmsg => {
    console.log("createMessage", newmsg);
    io.emit("newMessage", {
      from: newmsg.from,
      text: newmsg.text,
      createdAt: new Date().getTime()
    });
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
