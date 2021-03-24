"use strict";
var startButton = document.getElementById("start-button");
var field = document.getElementById("gamefield");
//Getting Slider and View of Colum
var columSlider = document.getElementById("columSlider");
var columValue = document.getElementById("columValue");
//Getting Slider and View of Row
var rowSlider = document.getElementById("rowSlider");
var rowValue = document.getElementById("rowValue");
startButton ? startButton.addEventListener("click", function (e) { return generateField(); }) : null;
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
function activateCell(id) {
    console.log(id);
    var clickedCell = document.getElementById(id);
    clickedCell === null || clickedCell === void 0 ? void 0 : clickedCell.classList.toggle("alive");
}
function generateField() {
    console.log("Generated Field");
    //clear the field
    field ? field.innerHTML = "" : null;
    for (var rowCount = 0; rowCount < parseInt(rowSlider.value); rowCount++) {
        //Cell "List"
        var cells = "";
        for (var xPos = 0; xPos < parseInt(columSlider.value); xPos++) {
            console.log("Added cell");
            cells += "<div class=\"cell dead\" id=\"" + ("x" + xPos + "/" + rowCount) + "\" data-y=\"" + xPos + "\" data-y=\"" + rowCount + "\" dead\" onClick=\"activateCell(this.id)\"></div>";
        }
        //Create one Row
        var currentRow = "\n        <div class=\"row\">\n        " + cells + "\n        </div>";
        field ? field.innerHTML += "\n        " + currentRow : null;
    }
}
