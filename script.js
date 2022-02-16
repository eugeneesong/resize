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

var audioCtx,
  oscillatorNode,
  gainNode,
  outer,
  expander,
  scale,
  startingWidth,
  timeout,
  lastNoteTime = 0,
  notes = [],
  alerted = false;

function onResize(event) {
  var width = window.innerWidth,
    t = performance.now(),
    x = (expander.offsetWidth - 4) / 50;

  if (width < startingWidth) setMargins();

  if (!audioCtx || audioCtx.state == "suspended") {
    if (!alerted) {
      alerted = true;
      alert("Click trombone to activate sound");
      setTimeout(function () {
        alerted = false;
      }, 1000);
    }
    return;
  }

  oscillatorNode.detune.value = x * -100 - 1200;
  gainNode.gain.value = 0.5;

  gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);

  if (t - lastNoteTime > 200) {
    lastNoteTime = t;
    addNote();
  }

  clearTimeout(timeout);
  timeout = setTimeout(function () {
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
  }, 200);
}

function setMargins() {
  var margin;

  startingWidth = Math.max(window.innerWidth, 400);
  margin = (startingWidth - 304) / 2;

  outer.style.marginLeft = margin;
  outer.style.marginRight = margin;

  scale.style.left = margin;
}

function audioSetup() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  oscillatorNode = audioCtx.createOscillator();
  oscillatorNode.type = "sawtooth";
  oscillatorNode.frequency.value = 440;
  oscillatorNode.detune.value = -1200;
  oscillatorNode.start(0);

  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;

  oscillatorNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
}

function addNote() {
  var element = document.createElement("img"),
    note = {
      x: 203,
      y: 22,
      xv: Math.random() * 5 + 5,
      yv: Math.random() * 4 - 2,
      element: element,
    };

  element.src = "note.gif";
  element.className = "note";
  element.style.transform = "rotate(" + (Math.random() * 30 - 15) + "deg)";
  outer.appendChild(element);

  notes.push(note);
}

function moveNotes() {
  var newNotes = [];

  notes.forEach(function (note) {
    note.yv -= 0.2;

    note.x += note.xv;
    note.y += note.yv;

    if (note.y > -100) newNotes.push(note);

    note.element.style.top = note.y;
    note.element.style.left = note.x;
  });

  notes = newNotes;

  setTimeout(moveNotes, 50);
}

function setup() {
  if (opener) {
    window.moveTo(
      opener.screenLeft + 50, //(opener.outerWidth/2) - (window.outerWidth/2),
      opener.screenTop + opener.outerHeight / 2 - window.outerHeight / 2 - 50
    );
  }

  outer = document.getElementById("outer");
  expander = document.getElementById("expander");
  scale = document.getElementById("scale");
  setMargins();
  audioSetup();

  document.addEventListener("click", function () {
    if (!audioCtx) audioSetup();

    audioCtx.resume();
  });

  window.addEventListener("resize", onResize);

  moveNotes();
}

window.addEventListener("load", function () {
  if (!opener) setup();
});
