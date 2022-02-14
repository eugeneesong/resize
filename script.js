// const message = cursorTag.querySelector("div span");
// const line = image.querySelectorAll("image[data-hover]");

// line.forEach((indivLine) => {
//   indivLine.addEventListener("mouseover", function () {
//     message.innerHTML = "testing";
//   });
// });

close = document.getElementById("close");
close.addEventListener(
  "click",
  function () {
    note = document.getElementById("note");
    note.style.display = "none";
  },
  false
);
const deleteBtn = document.getElementById("delete");
const notification = document.getElementById("notification");
const closeBtn = document.getElementById("close");

deleteBtn.addEventListener("click", () => {
  notification.classList.add("notification-show");
});

closeBtn.addEventListener("click", () => {
  notification.classList.remove("notification-show");
});

var audio = document.getElementsByTagName("audio")[0];
audio.play();
var audio = document.getElementById("mySoundClip");
audio.play();
var audio = $("#mySoundClip")[0];
audio.play();
var audio = $("#mySoundClip")[0];
$("nav a").mouseenter(function () {
  audio.play();
});

// sound??
$(document).ready(function () {
  $("#line").mouseenter(function () {
    $("#violinmusic")[0].play();
  });

  $("#line").mouseleave(function () {
    $("#violinmusic")[0].pause();
    $("#violinmusic")[0].currentTime = 0;
  });
});
