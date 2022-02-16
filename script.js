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
