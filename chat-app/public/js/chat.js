const socket = io();

const $chatForm = document.querySelector("#chatForm");
const $chatFormInput = $chatForm?.querySelector("input");
const $chatFormSendButton = $chatForm?.querySelector("button");
const $sendLocationBtn = document.querySelector("#shareLocation");
const $messages = document.querySelector("#messages");

// Templates
const $messageTemplate = document.querySelector("#message-template").innerHTML;
const $locationTemplate =
  document.querySelector("#location-template").innerHTML;

const $sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoscroll = () => {
  // New message element
  const $newMessage = $messages.lastElementChild;

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of messages container
  const containerHeight = $messages.scrollHeight;

  // How far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render($messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm:ss a"),
  });
  $messages?.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("locationMessage", (message) => {
  const html = Mustache.render($locationTemplate, {
    username: message.username,
    locationUrl: message.url,
    createdAt: moment(message.createdAt).format("h:mm:ss a"),
  });
  $messages?.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render($sidebarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});

$chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $chatFormSendButton?.setAttribute("disabled", "disabled");
  const typedMsg = e.target.elements.message.value;

  socket.emit("sendMessage", typedMsg, (error) => {
    $chatFormSendButton?.removeAttribute("disabled");
    $chatFormInput.value = "";
    $chatFormInput?.focus();

    if (error) {
      return console.log(error);
    }
    console.log("Message Delivered..!");
  });
});

$sendLocationBtn.addEventListener("click", () => {
  $sendLocationBtn.setAttribute("disabled", "disabled");

  if (!navigator.geolocation) {
    return alert("Your browser does not support location sharing..!");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "shareLocation",
      {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      },
      () => {
        $sendLocationBtn?.removeAttribute("disabled");
        console.log("Location Shared..!");
      }
    );
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
