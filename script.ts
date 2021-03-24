interface Cell {
    id: string;
    x: number;
    y: number;
}


const startButton = document.getElementById("start-button");
const field = document.getElementById("gamefield");

//Getting Slider and View of Colum
const columSlider = document.getElementById("columSlider") as HTMLInputElement;
const columValue = document.getElementById("columValue");

//Getting Slider and View of Row
const rowSlider = document.getElementById("rowSlider") as HTMLInputElement;
const rowValue = document.getElementById("rowValue");


startButton?startButton.addEventListener("click", (e:Event) => generateField()):null;

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

function activateCell(id:string){
    console.log(id);
    const clickedCell = document.getElementById(id);
    clickedCell?.classList.toggle("alive");
}

function generateField(){
    console.log("Generated Field");
    
    //clear the field
    field?field.innerHTML = "":null;
    for(let rowCount = 0; rowCount < parseInt(rowSlider.value); rowCount++ ){
        //Cell "List"
        let cells:string = "";


        for(let xPos = 0;xPos< parseInt(columSlider.value); xPos++){
            console.log("Added cell");
            cells += `<div class="cell dead" id="${"x" + xPos +"/" + rowCount}" data-y="${xPos}" data-y="${rowCount}" dead" onClick="activateCell(this.id)"></div>`;
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