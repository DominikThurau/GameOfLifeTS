interface Cell {
    id: string;
    x: number;
    y: number;
}

let mouseDown: boolean = false;
document.body.onmousedown = function() { 
    mouseDown = true;
  }
  document.body.onmouseup = function() {
    mouseDown = false;
  }

const startButton = document.getElementById("start-button");
const field = document.getElementById("gamefield");

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
columSlider?console.log(columSlider.value):null;

objekte.forEach((e) => {console.log(e)});



let a : Cell = {id: "1", x: 0, y: 0};

function generateField(){
    console.log("Generated Field");
    
    //clear the field
    field?field.innerHTML = "":null;
    for(let rowCount = 0; rowCount < parseInt(rowSlider.value); rowCount++ ){
        //Cell "List"
        let cells:string = "";


        for(let xPos = 0;xPos< parseInt(columSlider.value); xPos++){
            console.log("Added cell");
            cells += `<div class="cell dead" id="${"x" + xPos +"/y" + rowCount}" data-x="${xPos}" data-y="${rowCount}" dead" onmouseover="addSelection(this.dataset.x, this.dataset.y)" onmouseout="removeSelection(this.dataset.x, this.dataset.y)"></div>`;
        }

        //Create one Row
        let currentRow = `
        <div class="row">
        ${cells}
        </div>`;
        field?field.innerHTML += `
        ${currentRow}`:null;
    }
}

function addSelection(xPos:string, yPos:string){
    console.log("Mouse is over!");
    let calcId = `x${xPos}/y${yPos}`;
    const selectedCell = document.getElementById(`x${xPos}/y${yPos}`);
    selectedCell?.classList.add("mouseOver");
    if(mouseDown){
        console.log("Draw");
        activateCell(xPos, yPos);
    }
}

function removeSelection(xPos:string, yPos:string){
    console.log("Mouse is over!");
    let calcId = `x${xPos}/y${yPos}`;
    const selectedCell = document.getElementById(`x${xPos}/y${yPos}`);
    selectedCell?.classList.remove("mouseOver");
}

function activateCell(xPos:string, yPos:string){
    let calcId = `x${xPos}/y${yPos}`;
    console.log(calcId);
    const clickedCell = document.getElementById(`x${xPos}/y${yPos}`);
    const leftCell = document.getElementById(`x${(parseInt(xPos)-1).toString()}/y${(parseInt(yPos)-1).toString()}`);
    console.log(clickedCell);
    console.log(leftCell);
    clickedCell?.classList.toggle("alive");
    leftCell?.classList.toggle("alive");
}