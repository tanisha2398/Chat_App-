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
socket.on("newLocationMessage", function(msg) {
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">my current location</a>');
  li.text(`${msg.from}: `);
  a.attr("href", msg.url);
  li.append(a);
  jQuery("#messages").append(li);
});
socket.on("disconnect", function() {
  console.log("disconnected from server");
});

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

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert("Unable to fetch location");
    }
  );
});
