// import moment = require("moment");

var socket = io();

function scrollToBottom() {
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child");
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("no error");
      var template = jQuery("#name-template").html();
      var html = Mustache.render(template, {
        from: params.name,
        image: params.image,
        room: params.room
      });
      jQuery(".currentUser").append(html);
      var template = jQuery("#name-header").html();
      var html = Mustache.render(template, {
        from: params.name
      });
      jQuery("#nameUser").append(html);
    }
  });
});

socket.on("updateUserList", function(users) {
  var ol = jQuery("<ol></ol>");
  users.forEach(function(user) {
    ol.append(jQuery("<li></li>").text(user));
  });
  jQuery("#users").html(ol);
});

socket.on("newMessage", function(msg) {
  var params = jQuery.deparam(window.location.search);
  var formattedTime = moment(msg.createdAt).format("h:mm a");
  console.log(params.name);
  console.log(msg.from);
  if (msg.from !== params.name) {
    var template = jQuery("#message-template").html();
  } else {
    var template = jQuery("#message-other-template").html();
  }
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    image: msg.image,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  scrollToBottom();
  // var formattedTime = moment(msg.createdAt).format("h:mm a");
});
socket.on("newAdminMessage", function(msg) {
  var formattedTime = moment(msg.createdAt).format("h:mm a");

  var template = jQuery("#message-admin-template").html();

  var html = Mustache.render(template, {
    text: msg.text,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  scrollToBottom();
});
socket.on("newLocationMessage", function(msg) {
  var formattedTime = moment(msg.createdAt).format("h:mm a");

  var params = jQuery.deparam(window.location.search);
  if (msg.from !== params.name) {
    var template = jQuery("#location-message-template").html();
  } else {
    var template = jQuery("#location-other-template").html();
  }

  var html = Mustache.render(template, {
    from: msg.from,
    createdAt: formattedTime,
    url: msg.url
  });
  jQuery("#messages").append(html);
  scrollToBottom();
});

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

var messageTextBox = jQuery("[name=message]");

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: jQuery.deparam(window.location.search).name,
      text: messageTextBox.val()
    },
    function() {
      messageTextBox.val("");
    }
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }

  locationButton.attr("disabled", "disabled").text("Sending location...");
  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr("disabled").text("Send location");
      alert("Unable to fetch location");
    }
  );
});
