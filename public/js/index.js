var socket = io();
socket.on("connect", function() {
  console.log("connected to server");
});
socket.on("newMessage", function(msg) {
  console.log("got new message", msg);
  var li = jQuery("<li></li>");
  li.text(`${msg.from}:${msg.text}`);
  jQuery("#messages").append(li);
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
jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "user",
      text: jQuery("[name=message]").val()
    },
    function() {}
  );
});
