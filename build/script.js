"use strict";
var mouseDown = false;
document.body.onmousedown = function () {
    mouseDown = true;
};
document.body.onmouseup = function () {
    mouseDown = false;
};
var startButton = document.getElementById("start-button");
var field = document.getElementById("gamefield");
//Getting Slider and View of Colum
var columSlider = document.getElementById("columSlider");
var columValue = document.getElementById("columValue");
//Getting Slider and View of Row
var rowSlider = document.getElementById("rowSlider");
var rowValue = document.getElementById("rowValue");
startButton && startButton.addEventListener("click", function (e) { return generateField(); });
var displayColumnValue = function () {
    var newValue = columSlider.value;
    columValue ? columValue.innerHTML = newValue : null;
    generateField();
};
var displayRowValue = function () {
    var newValue = rowSlider.value;
    rowValue ? rowValue.innerHTML = newValue : null;
    generateField();
};
displayColumnValue();
displayRowValue();
//Add Eventlistener
columSlider.addEventListener("input", displayColumnValue);
rowSlider.addEventListener("input", displayRowValue);
var objekte = ["sas", "sass", "ff"];
columSlider ? console.log(columSlider.value) : null;
objekte.forEach(function (e) { console.log(e); });
var a = { id: "1", x: 0, y: 0 };
function generateField() {
    console.log("Generated Field");
    //clear the field
    field ? field.innerHTML = "" : null;
    for (var rowCount = 0; rowCount < parseInt(rowSlider.value); rowCount++) {
        //Cell "List"
        var cells = "";
        for (var xPos = 0; xPos < parseInt(columSlider.value); xPos++) {
            console.log("Added cell");
            cells += "<div class=\"cell dead\" id=\"" + ("x" + xPos + "/y" + rowCount) + "\" data-x=\"" + xPos + "\" data-y=\"" + rowCount + "\" dead\" onmouseover=\"addSelection(this.dataset.x, this.dataset.y)\" onmouseout=\"removeSelection(this.dataset.x, this.dataset.y)\"></div>";
        }
        //Create one Row
        var currentRow = "\n        <div class=\"row\">\n        " + cells + "\n        </div>";
        field ? field.innerHTML += "\n        " + currentRow : null;
    }
}
function addSelection(xPos, yPos) {
    console.log("Mouse is over!");
    var calcId = "x" + xPos + "/y" + yPos;
    var selectedCell = document.getElementById("x" + xPos + "/y" + yPos);
    selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.classList.add("mouseOver");
    if (mouseDown) {
        console.log("Draw");
        activateCell(xPos, yPos);
    }
}
function removeSelection(xPos, yPos) {
    console.log("Mouse is over!");
    var calcId = "x" + xPos + "/y" + yPos;
    var selectedCell = document.getElementById("x" + xPos + "/y" + yPos);
    selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.classList.remove("mouseOver");
}
function activateCell(xPos, yPos) {
    var calcId = "x" + xPos + "/y" + yPos;
    console.log(calcId);
    var clickedCell = document.getElementById("x" + xPos + "/y" + yPos);
    var leftCell = document.getElementById("x" + (parseInt(xPos) - 1).toString() + "/y" + (parseInt(yPos) - 1).toString());
    console.log(clickedCell);
    console.log(leftCell);
    clickedCell === null || clickedCell === void 0 ? void 0 : clickedCell.classList.toggle("alive");
    leftCell === null || leftCell === void 0 ? void 0 : leftCell.classList.toggle("alive");
}
