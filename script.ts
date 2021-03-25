interface Cell {
    id: string;
    x: number;
    y: number;
}

let mouseDown: boolean = false;
let isPencil: boolean = true;

document.body.onmousedown = function() { 
    mouseDown = true;
  }
  document.body.onmouseup = function() {
    mouseDown = false;
  }

const startButton = document.getElementById("start-button");
const field = document.getElementById("gamefield");

const drawModeButton = document.getElementById("draw-mode-button");

function toggleDrawMode(){
    isPencil=!isPencil;

    if(isPencil){
        drawModeButton?drawModeButton.innerHTML = "Pencil":null;
    } else {
        drawModeButton?drawModeButton.innerHTML = "Eraser":null;
    }
    
}

//Getting Slider and View of Colum
const columSlider = document.getElementById("columSlider") as HTMLInputElement;
const columValue = document.getElementById("columValue");

//Getting Slider and View of Row
const rowSlider = document.getElementById("rowSlider") as HTMLInputElement;
const rowValue = document.getElementById("rowValue");


startButton&&startButton.addEventListener("click", (e:Event) => generateField());

let displayColumnValue = function(){
    let newValue = columSlider.value;
    columValue?columValue.innerHTML = newValue:null;
    generateField();
}
let displayRowValue = function(){
    let newValue = rowSlider.value;
    rowValue?rowValue.innerHTML = newValue:null;
    generateField();
}

displayColumnValue();
displayRowValue();

//Add Eventlistener
columSlider.addEventListener("input", displayColumnValue);
rowSlider.addEventListener("input", displayRowValue);

var objekte = ["sas", "sass", "ff"];




let a : Cell = {id: "1", x: 0, y: 0};

function generateField(){
    
    //clear the field
    field?field.innerHTML = "":null;
    for(let rowCount = 0; rowCount < parseInt(rowSlider.value); rowCount++ ){
        //Cell "List"
        let cells:string = "";


        for(let xPos = 0;xPos< parseInt(columSlider.value); xPos++){
            cells += `<div class="cell dead" draggable="false" id="${"x" + xPos +"/y" + rowCount}" data-x="${xPos}" data-y="${rowCount}" dead" onmouseover="addSelection(this.dataset.x, this.dataset.y)" onmouseout="removeSelection(this.dataset.x, this.dataset.y)" onclick="activateCell(this.dataset.x, this.dataset.y)"></div>`;
        }

        //Create one Row
        let currentRow = `
        <div class="row" draggable="false">
        ${cells}
        </div>`;
        field?field.innerHTML += `
        ${currentRow}`:null;
    }
}

function addSelection(xPos:string, yPos:string){
    let calcId = `x${xPos}/y${yPos}`;
    const selectedCell = document.getElementById(`x${xPos}/y${yPos}`);
    selectedCell?.classList.add("mouseOver");
    if(mouseDown){
        activateCell(xPos, yPos);
    }
}

function removeSelection(xPos:string, yPos:string){
    let calcId = `x${xPos}/y${yPos}`;
    const selectedCell = document.getElementById(`x${xPos}/y${yPos}`);
    selectedCell?.classList.remove("mouseOver");
}

function activateCell(xPos:string, yPos:string){
    let calcId = `x${xPos}/y${yPos}`;
    const clickedCell = document.getElementById(`x${xPos}/y${yPos}`);
    const leftCell = document.getElementById(`x${(parseInt(xPos)-1).toString()}/y${(parseInt(yPos)-1).toString()}`);
    isPencil?(clickedCell?.classList.add("alive")):(clickedCell?.classList.remove("alive"))
}