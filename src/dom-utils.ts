import { clearCanvas, displayColumnValue, displayRowValue, displaySpeedValue, fillRandom, startAndStop, switchBrush, toggleDrawMode } from "./index";

//Getting Gamefield
export const field = document.getElementById("gamefield");

//Getting Tags
export const startButton = document.getElementById("start-button");
export const drawModeButton = document.getElementById("draw-mode-button");
export const clearButton = document.getElementById("clear-button");
export const randomButton = document.getElementById("random-button");
export const pixelBrushButton = document.getElementById("pixel-brush-button");
export const pulsarBrushButton = document.getElementById("pulsar-brush-button");
export const pentaBrushButton = document.getElementById("penta-brush-button");

//Getting Slider and View of Colum
export const columSlider = document.getElementById("columSlider") as HTMLInputElement;
export const columValue = document.getElementById("columValue");

//Getting Slider and View of Row
export const rowSlider = document.getElementById("rowSlider") as HTMLInputElement;
export const rowValue = document.getElementById("rowValue");

//Getting Slider and View of Row
export const speedSlider = document.getElementById("speedSlider") as HTMLInputElement;
export const speedValue = document.getElementById("speedValue");

//Add Eventlistener
columSlider.addEventListener("change", function () {
    displayColumnValue("notInit");
  });
  rowSlider.addEventListener("change", function () {
    displayRowValue("notInit");
  });
  speedSlider.addEventListener("change", function () {
    displaySpeedValue("notInit");
  });
  startButton?.addEventListener("click", function () {
    startAndStop();
  });
  drawModeButton?.addEventListener("click", function () {
    toggleDrawMode();
  });
  clearButton?.addEventListener("click", function () {
    clearCanvas();
  });
  randomButton?.addEventListener("click", function () {
    fillRandom();
  });
  pixelBrushButton?.addEventListener("click", function () {
    switchBrush("pixelbrush");
  });
  pulsarBrushButton?.addEventListener("click", function () {
    switchBrush("pulsarBrush");
  });
  pentaBrushButton?.addEventListener("click", function () {
    switchBrush("pentadecathlon");
  });