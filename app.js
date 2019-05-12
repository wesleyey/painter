const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("colorPick__color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-mode");

canvas.width = 650;
canvas.height = 650;

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;
ctx.fillStyle = "black";

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function getColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function getRange(event) {
  const rangeValue = event.target.value;
  ctx.lineWidth = rangeValue;
}

function modeChange() {
  //console.log(filling);
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function fillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, 650, 650);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillCanvas);
}

Array.from(colors).forEach(function(item) {
  item.addEventListener("click", getColor);
});

/*
Array.from(colors).forEach(color =>
    color.addEventListener("click", getColor);
);
*/
if (range) {
  range.addEventListener("input", getRange);
}

if (mode) {
  mode.addEventListener("click", modeChange);
}
