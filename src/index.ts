import {
  clearButton,
  columSlider,
  columValue,
  drawModeButton,
  field,
  pentaBrushButton,
  pixelBrushButton,
  pulsarBrushButton,
  randomButton,
  rowSlider,
  rowValue,
  speedSlider,
  speedValue,
  startButton,
} from "./dom-utils";
import { generateField } from "./fieldGeneration";
import { scanForNeighbours } from "./scanNeighbours";

//Defining Variables

export let isPencil: boolean = true;
export let brush: string = "pixelbrush";
let play: boolean = false;
let speed: number;
export let cellTable = new Map();

//Init
function loadData() {
  if (localStorage.getItem("columns")) {
    columSlider.value = localStorage.getItem("columns") as string;
    columValue!.innerText = localStorage.getItem("columns") as string;
  } else {
    localStorage.setItem("columns", columSlider.value.toString());
    columSlider.value = localStorage.getItem("columns") as string;
    columValue!.innerText = localStorage.getItem("columns") as string;
  }

  if (localStorage.getItem("rows")) {
    rowSlider.value = localStorage.getItem("rows") as string;
    rowValue!.innerText = localStorage.getItem("rows") as string;
  } else {
    localStorage.setItem("rows", rowSlider.value.toString());
    rowSlider.value = localStorage.getItem("rows") as string;
    rowValue!.innerText = localStorage.getItem("rows") as string;
  }

  if (localStorage.getItem("speed")) {
    speedSlider.value = localStorage.getItem("speed") as string;
    speedValue!.innerText = localStorage.getItem("speed") as string;
    speed = parseInt(localStorage.getItem("speed") as string);
  } else {
    localStorage.setItem("speed", speedSlider.value.toString());
    speedSlider.value = localStorage.getItem("speed") as string;
    speedValue!.innerText = localStorage.getItem("speed") as string;
    speed = parseInt(localStorage.getItem("speed") as string);
  }

  generateField();
}



//Changing between Pencil and Eraser
export function toggleDrawMode() {
  isPencil = !isPencil;

  if (isPencil) {
    drawModeButton ? (drawModeButton.innerHTML = "Pencil") : null;
  } else {
    drawModeButton ? (drawModeButton.innerHTML = "Eraser") : null;
  }
}

//Toggling between start and pause
export function startAndStop(stop?: boolean) {
  if (stop) {
    play = false;
    startButton ? (startButton.innerHTML = "Play") : null;
  } else {
    play = !play;
    if (!play) {
      startButton ? (startButton.innerHTML = "Play") : null;
    } else {
      startButton ? (startButton.innerHTML = "Pause") : null;
    }
    if (play) {
      playSimulation();
    }
  }
}

//Render SliderValues
export function displayColumnValue(init: string) {
  console.log("hsjahs");
  if (init !== "init") {
    let newValue = columSlider.value;

    localStorage.setItem("columns", newValue.toString());

    columValue ? (columValue.innerHTML = newValue) : null;
    generateField();
  }
}
export function displayRowValue(init: string) {
  if (init !== "init") {
    let newValue = rowSlider.value;

    localStorage.setItem("rows", newValue.toString());

    rowValue ? (rowValue.innerHTML = newValue) : null;
    generateField();
  }
}
export function displaySpeedValue(init: string) {
  if (init !== "init") {
    speed = parseInt(speedSlider.value);
    localStorage.setItem("speed", speed.toString());
    speedValue ? (speedValue.innerHTML = speed.toString()) : null;
  }
}

window.onload = function () {
  loadData();
};

//Init Game
displayColumnValue("init");
displayRowValue("init");
displaySpeedValue("init");

export function changeStates() {
  //console.log(parseInt(element.dataset.neighbours));
  cellTable.forEach((element) => {
    if (
      !element.classList.contains("alive") &&
      parseInt(element.dataset.neighbours) === 3
    ) {
      element.classList.add("alive");
      element.classList.remove("died");
    }
    if (
      element.classList.contains("alive") &&
      parseInt(element.dataset.neighbours) < 2
    ) {
      element.classList.remove("alive");
      element.classList.add("died");
    }
    if (
      element.classList.contains("alive") &&
      parseInt(element.dataset.neighbours) > 3
    ) {
      element.classList.remove("alive");
      element.classList.add("died");
    }

    //((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)===2));
    //((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)===3));
  });
}

function playSimulation() {
  if (play) {
    scanForNeighbours();
    setTimeout(() => {
      playSimulation();
    }, speed);
  }
}

export function clearCanvas() {
  cellTable.forEach(function (cell) {
    cell.classList.remove("died");
    cell.classList.remove("alive");
  });
  startAndStop(true);
}

export function switchBrush(pBrush: string) {
  brush = pBrush;
}

export function fillRandom() {
  clearCanvas();
  cellTable.forEach(function (cell) {
    let randomNumber: number = getRandomInt(5);
    if (randomNumber === 1) {
      cell.classList.add("alive");
    }
  });
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

