const path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");
const {
  generateMessage,
  generateAdminMessage,
  generateLocationMessage
} = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

var port = process.env.PORT || 3009;
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));
io.on("connection", socket => {
  console.log("new user connected");

  socket.on("join", (params, callback) => {
    if (
      !isRealString(params.name) ||
      !isRealString(params.room.toUpperCase())
    ) {
      return callback("name and room is required");
    }
    socket.join(params.room.toUpperCase());
    users.removeUser(socket.id);
    users.addUser(
      socket.id,
      params.name,
      params.image,
      params.room.toUpperCase()
    );

    io.to(params.room.toUpperCase()).emit(
      "updateUserList",
      users.getUserList(params.room.toUpperCase())
    );

    socket.emit("newAdminMessage", generateAdminMessage("Welcome to chat app"));
    socket.broadcast
      .to(params.room.toUpperCase())
      .emit(
        "newAdminMessage",
        generateAdminMessage(`${params.name} has joined`)
      );

    callback();
  });

  socket.on("createMessage", (newmsg, callback) => {
    var user = users.getUser(socket.id);

    if (user.name === newmsg.from && isRealString(newmsg.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, newmsg.text, user.image)
      );
    }
    callback();
  });
  socket.on("createLocationMessage", coords => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(
          user.name,
          user.image,
          coords.latitude,
          coords.longitude
        )
      );
    }
  });
  socket.on("disconnect", () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newAdminMessage",
        generateAdminMessage(`${user.name} has left`)
      );
    }
  });
});
server.listen(port, () => {
  console.log(`server started at port ${port}`);
});
