var socket = io();
socket.on("connect", function() {
  console.log("connected to server");
});
socket.on("newMessage", function(msg) {
  console.log("got new message", msg);
});
socket.on("disconnect", function() {
  console.log("disconnected from server");
});
socket.emit(
  "createMessage",
  {
    from: "mitalu",
    text: "i am going to party"
  },
  function(data) {
    console.log("got it", data);
  }
);
