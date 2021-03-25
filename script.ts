/*interface Cell {
    id: string;
    x: number;
    y: number;
    var objekte = ["sas", "sass", "ff"];
    let a : Cell = {id: "1", x: 0, y: 0};
}*/

//Defining Variables
let mouseDown: boolean = false;
let isPencil: boolean = true;
let brush: string = "deafult";

//Getting Gamefield
const field = document.getElementById("gamefield");

//Getting Tags
const startButton = document.getElementById("start-button");//Getting Buttons
const drawModeButton = document.getElementById("draw-mode-button"); //Getting Pencil Button

//Getting Slider and View of Colum
const columSlider = document.getElementById("columSlider") as HTMLInputElement;
const columValue = document.getElementById("columValue");

//Getting Slider and View of Row
const rowSlider = document.getElementById("rowSlider") as HTMLInputElement;
const rowValue = document.getElementById("rowValue");


//Toggling if mouse is down
document.body.onmousedown = function() { 
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}


//Changing between Pencil and Eraser
function toggleDrawMode(){
    isPencil=!isPencil;

    if(isPencil){
        drawModeButton?drawModeButton.innerHTML = "Pencil":null;
    } else {
        drawModeButton?drawModeButton.innerHTML = "Eraser":null;
    }
    
}

//Render SliderValues
function displayColumnValue(){
    let newValue = columSlider.value;
    columValue?columValue.innerHTML = newValue:null;
    generateField();
}
function displayRowValue(){
    let newValue = rowSlider.value;
    rowValue?rowValue.innerHTML = newValue:null;
    generateField();
}

//Add Eventlistener for  change of Inputvalues
columSlider.addEventListener("input", displayColumnValue);
rowSlider.addEventListener("input", displayRowValue);

//Init Game
displayColumnValue();
displayRowValue();

//Render gamefield
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

//Bring Cells back to Live or kill them
function activateCell(xPos:string, yPos:string, hover?:boolean){
    let calcId = `x${xPos}/y${yPos}`;
    //const clickedCell = document.getElementById(`x${xPos}/y${yPos}`);
    switch(brush) { 
        case "one": { 
           //statements; 
           !hover?brushOne(xPos, yPos):brushOne(xPos, yPos, true);
           break; 
        } 
        case "two": { 
           //statements; 
           break; 
        } 
        default: { 
            !hover?defaulBrush(xPos, yPos):defaulBrush(xPos, yPos, true);
           break; 
        } 
     } 
}

//Render Selection
function addSelection(xPos:string, yPos:string){
    //Getting clicked Position
    let calcId = `x${xPos}/y${yPos}`;
    const selectedCell = document.getElementById(`x${xPos}/y${yPos}`);
    activateCell(xPos, yPos, true);

    //Draw if mouse is down
    if(mouseDown){
        activateCell(xPos, yPos);
    }
}
//Remove Selection
function removeSelection(xPos:string, yPos:string){
    let calcId = `x${xPos}/y${yPos}`;
    const selectedCell = document.getElementById(`x${xPos}/y${yPos}`);
    activateCell(xPos, yPos, true);
}

//
function defaulBrush(xPos:string, yPos:string, hover?:boolean){
    //Which cells do you want to change?
    let cells: HTMLElement[] = [
        document.getElementById(`x${xPos}/y${yPos}`) as HTMLElement,
    ];

    //If Hovermode toggle hover effect
    if(hover){
        cells.forEach(cell => cell.classList.toggle("mouse-over"));
    } else{
        cells.forEach(cell => isPencil?cell.classList.add("alive"):cell.classList.remove("alive"))
    }
}

function brushOne(xPos:string, yPos:string, hover?:boolean){
    //Which cells do you want to change?
    let cells: HTMLElement[] = [
        document.getElementById(`x${xPos}/y${yPos}`) as HTMLElement,
        document.getElementById(`x${(parseInt(xPos)).toString()}/y${(parseInt(yPos) -1).toString()}`) as HTMLElement,
        document.getElementById(`x${(parseInt(xPos)).toString()}/y${(parseInt(yPos)  + 1).toString()}`) as HTMLElement,
        document.getElementById(`x${(parseInt(xPos) - 1).toString()}/y${(parseInt(yPos)).toString()}`) as HTMLElement,
        document.getElementById(`x${(parseInt(xPos) + 1).toString()}/y${(parseInt(yPos)).toString()}`) as HTMLElement,
    ];

    //If Hovermode toggle hover effect
    if(hover){
        cells.forEach(cell => cell.classList.toggle("mouse-over"));
    } else{
        cells.forEach(cell => isPencil?cell.classList.add("alive"):cell.classList.remove("alive"))
    }
}

