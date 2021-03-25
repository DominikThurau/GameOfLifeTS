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
let brush = "default";
let play = false;
let speed;
let cellTable = new Map();
//Getting Gamefield
const field = document.getElementById("gamefield");
//Getting Tags
const startButton = document.getElementById("start-button"); //Getting Buttons
const drawModeButton = document.getElementById("draw-mode-button"); //Getting Pencil Button
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
function startAndStop() {
    play = !play;
    if (play) {
        playSimulation();
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
        case "one": {
            //statements; 
            !hover ? brushOne(xPos, yPos) : brushOne(xPos, yPos, true);
            break;
        }
        case "two": {
            //statements; 
            break;
        }
        default: {
            !hover ? defaulBrush(xPos, yPos) : defaulBrush(xPos, yPos, true);
            break;
        }
    }
}
//Render Selection
function addSelection(xPos, yPos) {
    //Getting clicked Position
    const selectedCell = document.getElementById(`${xPos + "_" + yPos}`);
    activateCell(xPos, yPos, true);
    //Draw if mouse is down
    if (mouseDown) {
        activateCell(xPos, yPos);
    }
}
//Remove Selection
function removeSelection(xPos, yPos) {
    const selectedCell = document.getElementById(`${xPos + "_" + yPos}`);
    activateCell(xPos, yPos, true);
}
//
function defaulBrush(xPos, yPos, hover) {
    //Which cells do you want to change?
    let cells = [
        document.getElementById(`${xPos + "_" + yPos}`),
    ];
    //If Hovermode toggle hover effect
    if (hover) {
        cells.forEach(cell => cell.classList.toggle("mouse-over"));
    }
    else {
        cells.forEach(cell => isPencil ? cell.classList.add("alive") : cell.classList.remove("alive"));
    }
}
function brushOne(xPos, yPos, hover) {
    //Which cells do you want to change?
    let cells = [
        document.getElementById(`${xPos + "_" + yPos}`),
        document.getElementById(`${(parseInt(xPos)).toString()}_${(parseInt(yPos) - 1).toString()}`),
        document.getElementById(`${(parseInt(xPos)).toString()}_${(parseInt(yPos) + 1).toString()}`),
        document.getElementById(`${(parseInt(xPos) - 1).toString()}_${(parseInt(yPos)).toString()}`),
        document.getElementById(`${(parseInt(xPos) + 1).toString()}_${(parseInt(yPos)).toString()}`),
    ];
    //If Hovermode toggle hover effect
    if (hover) {
        cells.forEach(cell => cell.classList.toggle("mouse-over"));
    }
    else {
        cells.forEach(cell => isPencil ? cell.classList.add("alive") : cell.classList.remove("alive"));
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
        ((!element.classList.contains("alive")) && parseInt(element.dataset.neighbours) === 3) && element.classList.add("alive");
        ((element.classList.contains("alive")) && parseInt(element.dataset.neighbours) < 2) && element.classList.remove("alive");
        //((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)===2));
        //((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)===3));
        ((element.classList.contains("alive")) && parseInt(element.dataset.neighbours) > 3) && element.classList.remove("alive");
    });
}
function playSimulation() {
    if (play) {
        scanForNeighbours();
        setTimeout(() => { playSimulation(); }, speed);
    }
}
