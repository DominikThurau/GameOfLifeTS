"use strict";
/*interface Cell {
    id: string;
    x: number;
    y: number;
    var objekte = ["sas", "sass", "ff"];
    let a : Cell = {id: "1", x: 0, y: 0};
}*/
//Defining Variables
let mouseDown = false;
let isPencil = true;
let brush = "pixelbrush";
let play = false;
let speed;
let cellTable = new Map();
//Getting Gamefield
const field = document.getElementById("gamefield");
//Getting Tags
const startButton = document.getElementById("start-button"); //Getting Buttons
const drawModeButton = document.getElementById("draw-mode-button"); //Getting Pencil Button
const clearButton = document.getElementById("clear-button"); //Getting Pencil Button
//Getting Slider and View of Colum
const columSlider = document.getElementById("columSlider");
const columValue = document.getElementById("columValue");
//Getting Slider and View of Row
const rowSlider = document.getElementById("rowSlider");
const rowValue = document.getElementById("rowValue");
//Getting Slider and View of Row
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
//Toggling if mouse is down
document.body.onmousedown = function () {
    mouseDown = true;
};
document.body.onmouseup = function () {
    mouseDown = false;
};
//Changing between Pencil and Eraser
function toggleDrawMode() {
    isPencil = !isPencil;
    if (isPencil) {
        drawModeButton ? drawModeButton.innerHTML = "Pencil" : null;
    }
    else {
        drawModeButton ? drawModeButton.innerHTML = "Eraser" : null;
    }
}
//Toggling between start and pause
function startAndStop(stop) {
    if (stop) {
        play = false;
        startButton ? startButton.innerHTML = "Play" : null;
    }
    else {
        play = !play;
        if (!play) {
            startButton ? startButton.innerHTML = "Play" : null;
        }
        else {
            startButton ? startButton.innerHTML = "Pause" : null;
        }
        if (play) {
            playSimulation();
        }
    }
}
//Render SliderValues
function displayColumnValue() {
    let newValue = columSlider.value;
    columValue ? columValue.innerHTML = newValue : null;
    generateField();
}
function displayRowValue() {
    let newValue = rowSlider.value;
    rowValue ? rowValue.innerHTML = newValue : null;
    generateField();
}
function displaySpeedValue() {
    speed = parseInt(speedSlider.value);
    speedValue ? speedValue.innerHTML = speed.toString() : null;
}
//Add Eventlistener for  change of Inputvalues
columSlider.addEventListener("input", displayColumnValue);
rowSlider.addEventListener("input", displayRowValue);
speedSlider.addEventListener("input", displaySpeedValue);
//Init Game
displayColumnValue();
displayRowValue();
displaySpeedValue();
//Render gamefield
function generateField() {
    //clear the field
    field ? field.innerHTML = "" : null;
    for (let yPos = 0; yPos < parseInt(rowSlider.value); yPos++) {
        //Cell "List"
        let cells = "";
        for (let xPos = 0; xPos < parseInt(columSlider.value); xPos++) {
            cells += `<div class="cell dead" draggable="false" id="${xPos + "_" + yPos}" data-x="${xPos}" data-y="${yPos}" data-neighbours="0" onmouseover="addSelection(this.dataset.x, this.dataset.y)" onmouseout="removeSelection(this.dataset.x, this.dataset.y)" onclick="activateCell(this.dataset.x, this.dataset.y)"></div>`;
        }
        //Create one Row
        let currentRow = `
        <div class="row" draggable="false">
        ${cells}
        </div>`;
        field ? field.innerHTML += `
        ${currentRow}` : null;
    }
    for (let yPos = 0; yPos < parseInt(rowSlider.value); yPos++) {
        for (let xPos = 0; xPos < parseInt(columSlider.value); xPos++) {
            cellTable.set(`${xPos + "_" + yPos}`, document.getElementById(xPos + "_" + yPos));
        }
    }
}
//Bring Cells back to Live or kill them
function activateCell(xPos, yPos, hover) {
    //const clickedCell = document.getElementById(`x${xPos}/y${yPos}`);
    switch (brush) {
        case "pixelbrush": {
            let pixelBrush = [
                { x: 0, y: 0 }
            ];
            //statements; 
            !hover ? brushSelector(pixelBrush, xPos, yPos) : brushSelector(pixelBrush, xPos, yPos, true);
            break;
        }
        case "pentadecathlon": {
            //statements; 
            //Brush
            let pentadecathlonBrush = [
                { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -4 }, { x: 0, y: -5 }, { x: 0, y: 1 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: -1, y: -3 }, { x: 1, y: -3 }, { x: -1, y: 2 }, { x: 1, y: 2 },
            ];
            !hover ? brushSelector(pentadecathlonBrush, xPos, yPos) : brushSelector(pentadecathlonBrush, xPos, yPos, true);
            break;
        }
        case "two": {
            //statements; 
            break;
        }
        case "pulsarBrush": {
            //pulsar brush; 
            let pulsarBrush = [
                { x: -3, y: -7 },
                { x: -3, y: -6 },
                { x: -3, y: -5 },
                { x: -2, y: -5 },
                { x: -2, y: -3 },
                { x: -1, y: -3 },
                { x: -1, y: -2 },
                { x: -7, y: -3 },
                { x: -6, y: -3 },
                { x: -5, y: -3 },
                { x: -5, y: -2 },
                { x: -3, y: -2 },
                { x: -3, y: -1 },
                { x: -2, y: -1 },
                { x: 3, y: -7 },
                { x: 3, y: -6 },
                { x: 3, y: -5 },
                { x: 2, y: -5 },
                { x: 2, y: -3 },
                { x: 1, y: -3 },
                { x: 1, y: -2 },
                { x: 7, y: -3 },
                { x: 6, y: -3 },
                { x: 5, y: -3 },
                { x: 5, y: -2 },
                { x: 3, y: -2 },
                { x: 3, y: -1 },
                { x: 2, y: -1 },
                { x: 3, y: 7 },
                { x: 3, y: 6 },
                { x: 3, y: 5 },
                { x: 2, y: 5 },
                { x: 2, y: 3 },
                { x: 1, y: 3 },
                { x: 1, y: 2 },
                { x: 7, y: 3 },
                { x: 6, y: 3 },
                { x: 5, y: 3 },
                { x: 5, y: 2 },
                { x: 3, y: 2 },
                { x: 3, y: 1 },
                { x: 2, y: 1 },
                { x: -3, y: 7 },
                { x: -3, y: 6 },
                { x: -3, y: 5 },
                { x: -2, y: 5 },
                { x: -2, y: 3 },
                { x: -1, y: 3 },
                { x: -1, y: 2 },
                { x: -7, y: 3 },
                { x: -6, y: 3 },
                { x: -5, y: 3 },
                { x: -5, y: 2 },
                { x: -3, y: 2 },
                { x: -3, y: 1 },
                { x: -2, y: 1 },
            ];
            !hover ? brushSelector(pulsarBrush, xPos, yPos) : brushSelector(pulsarBrush, xPos, yPos, true);
            break;
        }
        default: {
            !hover ? brushSelector([{ x: 0, y: 0 }], xPos, yPos) : brushSelector([{ x: 0, y: 0 }], xPos, yPos, true);
            break;
        }
    }
}
//Render Selection
function addSelection(xPos, yPos) {
    //Getting clicked Position
    activateCell(xPos, yPos, true);
    //Draw if mouse is down
    if (mouseDown) {
        activateCell(xPos, yPos);
    }
}
//Remove Selection
function removeSelection(xPos, yPos) {
    activateCell(xPos, yPos, true);
}
function brushSelector(brush, xPos, yPos, hover) {
    //If Hovermode toggle hover effect
    if (hover) {
        brush.forEach(cell => {
            var _a;
            return document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`) ?
                (_a = document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`)) === null || _a === void 0 ? void 0 : _a.classList.toggle("mouse-over") : null;
        });
    }
    else {
        brush.forEach(cell => { var _a, _b; return isPencil ? (_a = document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`)) === null || _a === void 0 ? void 0 : _a.classList.add("alive") : ((_b = document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`)) === null || _b === void 0 ? void 0 : _b.classList.remove("alive")); });
    }
}
//Abfrage der Nachbarn
function scanForNeighbours() {
    let neighbours;
    cellTable.forEach(element => {
        neighbours = 0;
        //console.log(cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`));
        //console.log(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`);
        cellTable.get(`${(parseInt(element.dataset.x) - 1).toString()}_${(parseInt(element.dataset.y) - 1).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x) - 1).toString()}_${(parseInt(element.dataset.y) - 1).toString()}`).classList.contains("alive") && neighbours++;
        cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y) - 1).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y) - 1).toString()}`).classList.contains("alive") && neighbours++;
        cellTable.get(`${(parseInt(element.dataset.x) + 1).toString()}_${(parseInt(element.dataset.y) - 1).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x) + 1).toString()}_${(parseInt(element.dataset.y) - 1).toString()}`).classList.contains("alive") && neighbours++;
        cellTable.get(`${(parseInt(element.dataset.x) - 1).toString()}_${(parseInt(element.dataset.y)).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x) - 1).toString()}_${(parseInt(element.dataset.y)).toString()}`).classList.contains("alive") && neighbours++;
        cellTable.get(`${(parseInt(element.dataset.x) + 1).toString()}_${(parseInt(element.dataset.y)).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x) + 1).toString()}_${(parseInt(element.dataset.y)).toString()}`).classList.contains("alive") && neighbours++;
        cellTable.get(`${(parseInt(element.dataset.x) - 1).toString()}_${(parseInt(element.dataset.y) + 1).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x) - 1).toString()}_${(parseInt(element.dataset.y) + 1).toString()}`).classList.contains("alive") && neighbours++;
        cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y) + 1).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y) + 1).toString()}`).classList.contains("alive") && neighbours++;
        cellTable.get(`${(parseInt(element.dataset.x) + 1).toString()}_${(parseInt(element.dataset.y) + 1).toString()}`) && cellTable.get(`${(parseInt(element.dataset.x) + 1).toString()}_${(parseInt(element.dataset.y) + 1).toString()}`).classList.contains("alive") && neighbours++;
        //console.log(neighbours.toString());
        element.dataset.neighbours = neighbours.toString();
    });
    changeStates();
}
function changeStates() {
    //console.log(parseInt(element.dataset.neighbours));
    cellTable.forEach(element => {
        if ((!element.classList.contains("alive")) && (parseInt(element.dataset.neighbours) === 3)) {
            element.classList.add("alive");
            element.classList.remove("died");
        }
        if ((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours) < 2)) {
            element.classList.remove("alive");
            element.classList.add("died");
        }
        if ((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours) > 3)) {
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
        setTimeout(() => { playSimulation(); }, speed);
    }
}
function clearCanvas() {
    cellTable.forEach(function (cell) { cell.classList.remove("died"); cell.classList.remove("alive"); });
    startAndStop(true);
}
function switchBrush(pBrush) {
    brush = pBrush;
}
function fillRandom() {
    clearCanvas();
    cellTable.forEach(function (cell) {
        let randomNumber = getRandomInt(5);
        if (randomNumber === 1) {
            cell.classList.add("alive");
        }
    });
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
