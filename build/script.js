"use strict";
/*interface Cell {
    id: string;
    x: number;
    y: number;
    var objekte = ["sas", "sass", "ff"];
    let a : Cell = {id: "1", x: 0, y: 0};
}*/
//Defining Variables
var mouseDown = false;
var isPencil = true;
var brush = "deafult";
//Getting Gamefield
var field = document.getElementById("gamefield");
//Getting Tags
var startButton = document.getElementById("start-button"); //Getting Buttons
var drawModeButton = document.getElementById("draw-mode-button"); //Getting Pencil Button
//Getting Slider and View of Colum
var columSlider = document.getElementById("columSlider");
var columValue = document.getElementById("columValue");
//Getting Slider and View of Row
var rowSlider = document.getElementById("rowSlider");
var rowValue = document.getElementById("rowValue");
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
//Render SliderValues
function displayColumnValue() {
    var newValue = columSlider.value;
    columValue ? columValue.innerHTML = newValue : null;
    generateField();
}
function displayRowValue() {
    var newValue = rowSlider.value;
    rowValue ? rowValue.innerHTML = newValue : null;
    generateField();
}
//Add Eventlistener for  change of Inputvalues
columSlider.addEventListener("input", displayColumnValue);
rowSlider.addEventListener("input", displayRowValue);
//Init Game
displayColumnValue();
displayRowValue();
//Render gamefield
function generateField() {
    //clear the field
    field ? field.innerHTML = "" : null;
    for (var rowCount = 0; rowCount < parseInt(rowSlider.value); rowCount++) {
        //Cell "List"
        var cells = "";
        for (var xPos = 0; xPos < parseInt(columSlider.value); xPos++) {
            cells += "<div class=\"cell dead\" draggable=\"false\" id=\"" + ("x" + xPos + "/y" + rowCount) + "\" data-x=\"" + xPos + "\" data-y=\"" + rowCount + "\" dead\" onmouseover=\"addSelection(this.dataset.x, this.dataset.y)\" onmouseout=\"removeSelection(this.dataset.x, this.dataset.y)\" onclick=\"activateCell(this.dataset.x, this.dataset.y)\"></div>";
        }
        //Create one Row
        var currentRow = "\n        <div class=\"row\" draggable=\"false\">\n        " + cells + "\n        </div>";
        field ? field.innerHTML += "\n        " + currentRow : null;
    }
}
//Bring Cells back to Live or kill them
function activateCell(xPos, yPos, hover) {
    var calcId = "x" + xPos + "/y" + yPos;
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
    var calcId = "x" + xPos + "/y" + yPos;
    var selectedCell = document.getElementById("x" + xPos + "/y" + yPos);
    activateCell(xPos, yPos, true);
    //Draw if mouse is down
    if (mouseDown) {
        activateCell(xPos, yPos);
    }
}
//Remove Selection
function removeSelection(xPos, yPos) {
    var calcId = "x" + xPos + "/y" + yPos;
    var selectedCell = document.getElementById("x" + xPos + "/y" + yPos);
    activateCell(xPos, yPos, true);
}
//
function defaulBrush(xPos, yPos, hover) {
    //Which cells do you want to change?
    var cells = [
        document.getElementById("x" + xPos + "/y" + yPos),
    ];
    //If Hovermode toggle hover effect
    if (hover) {
        cells.forEach(function (cell) { return cell.classList.toggle("mouse-over"); });
    }
    else {
        cells.forEach(function (cell) { return isPencil ? cell.classList.add("alive") : cell.classList.remove("alive"); });
    }
}
function brushOne(xPos, yPos, hover) {
    //Which cells do you want to change?
    var cells = [
        document.getElementById("x" + xPos + "/y" + yPos),
        document.getElementById("x" + (parseInt(xPos)).toString() + "/y" + (parseInt(yPos) - 1).toString()),
        document.getElementById("x" + (parseInt(xPos)).toString() + "/y" + (parseInt(yPos) + 1).toString()),
        document.getElementById("x" + (parseInt(xPos) - 1).toString() + "/y" + (parseInt(yPos)).toString()),
        document.getElementById("x" + (parseInt(xPos) + 1).toString() + "/y" + (parseInt(yPos)).toString()),
    ];
    //If Hovermode toggle hover effect
    if (hover) {
        cells.forEach(function (cell) { return cell.classList.toggle("mouse-over"); });
    }
    else {
        cells.forEach(function (cell) { return isPencil ? cell.classList.add("alive") : cell.classList.remove("alive"); });
    }
}
