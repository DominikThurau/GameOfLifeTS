import { clearButton, columSlider, columValue, drawModeButton, field, pentaBrushButton, pixelBrushButton, pulsarBrushButton, randomButton, rowSlider, rowValue, speedSlider, speedValue, startButton } from "./getsAndVars";

//Defining Variables
let mouseDown: boolean = false;
let isPencil: boolean = true;
let brush: string = "pixelbrush";
let play: boolean = false;
let speed: number;

let cellTable = new Map();

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

//Toggling between start and pause
function startAndStop(stop?: boolean){
    if(stop){
        play = false;
        startButton?startButton.innerHTML = "Play":null;
        
    } else{
        play=!play;
        if(!play){
            startButton?startButton.innerHTML = "Play":null;
        } else {
            startButton?startButton.innerHTML = "Pause":null;
        }
        if(play){
            playSimulation();
        }
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
function displaySpeedValue(){
    speed = parseInt(speedSlider.value);
    speedValue?speedValue.innerHTML = speed.toString():null;

}


//Add Eventlistener
columSlider.addEventListener("input", displayColumnValue);
rowSlider.addEventListener("input", displayRowValue);
speedSlider.addEventListener("input", displaySpeedValue);
startButton?.addEventListener("click", function(){startAndStop()});
drawModeButton?.addEventListener("click", function(){toggleDrawMode()});
clearButton?.addEventListener("click", function(){clearCanvas()});
randomButton?.addEventListener("click", function(){fillRandom()});
pixelBrushButton?.addEventListener("click", function(){switchBrush('pixelbrush')});
pulsarBrushButton?.addEventListener("click", function(){switchBrush('pulsarBrush')});
pentaBrushButton?.addEventListener("click", function(){switchBrush('pentadecathlon')});

//Init Game
displayColumnValue();
displayRowValue();
displaySpeedValue();

//Render gamefield
function generateField(){
    
    //clear the field
    field?field.innerHTML = "":null;

    for(let yPos = 0; yPos < parseInt(rowSlider.value); yPos++ ){
        //Create one Row
        let currentRow = document.createElement("div");
        currentRow.classList.add("row");

        for(let xPos = 0;xPos< parseInt(columSlider.value); xPos++){
            let newCell = document.createElement("div");
            newCell.id = xPos +"_" + yPos;
            newCell.classList.add("cell");
            newCell.classList.add("dead");
            newCell.setAttribute("data-x", xPos.toString());
            newCell.setAttribute("data-y", yPos.toString());
            newCell.setAttribute("data-neighbours", "0");
            newCell.addEventListener("mouseover", function(){addSelection(this.dataset.x?.toString() as string, this.dataset.y?.toString() as string)});
            newCell.addEventListener("mouseout", function(){removeSelection(this.dataset.x?.toString() as string, this.dataset.y?.toString() as string)});
            newCell.addEventListener("click", function(){activateCell(this.dataset.x?.toString() as string, this.dataset.y?.toString() as string)});
            currentRow.appendChild(newCell); //`<div class="cell dead" draggable="false" id="${xPos +"_" + yPos}" data-x="${xPos}" data-y="${yPos}" data-neighbours="0" onmouseover="addSelection(this.dataset.x, this.dataset.y)" onmouseout="removeSelection(this.dataset.x, this.dataset.y)" onclick="activateCell(this.dataset.x, this.dataset.y)"></div>`;
        }


        field?field.appendChild(currentRow):null;
    }

    for(let yPos = 0; yPos < parseInt(rowSlider.value); yPos++ ){
        
        for(let xPos = 0;xPos< parseInt(columSlider.value); xPos++){
            cellTable.set(`${xPos +"_" + yPos}`, document.getElementById(xPos + "_" + yPos) );
        }
    }
}

//Bring Cells back to Live or kill them
function activateCell(xPos:string, yPos:string, hover?:boolean){
    //const clickedCell = document.getElementById(`x${xPos}/y${yPos}`);
    switch(brush) { 
        case "pixelbrush": { 
            let pixelBrush = [
                {x: 0,y: 0}
            ];
           //statements; 
           !hover?brushSelector(pixelBrush,xPos, yPos):brushSelector(pixelBrush, xPos, yPos, true);
           break; 
        } 
        case "pentadecathlon": { 
            //statements; 
            //Brush
            let pentadecathlonBrush = [
                {x: 0,y: 0},{x: 0,y: -1},{x: 0,y: -2},{x: 0,y: -4},{x: 0,y: -5},{x: 0,y: 1},{x: 0,y: 3},{x: 0,y: 4},{x: -1,y: -3},{x: 1,y: -3},{x: -1,y: 2},{x: 1,y: 2},
            
            ];
            !hover?brushSelector(pentadecathlonBrush,xPos, yPos):brushSelector(pentadecathlonBrush, xPos, yPos, true);
            break; 
         } 
        case "two": { 
           //statements; 
           break; 
        } 
        case "pulsarBrush": {
            //pulsar brush; 
            let pulsarBrush = [
                {x:-3, y:-7},
                {x:-3, y:-6},
                {x:-3, y:-5},
                {x:-2, y:-5},
                {x:-2, y:-3},
                {x:-1, y:-3},
                {x:-1, y:-2},
        
                {x:-7, y:-3},
                {x:-6, y:-3},
                {x:-5, y:-3},
                {x:-5, y:-2},
                {x:-3, y:-2},
                {x:-3, y:-1},
                {x:-2, y:-1},
        
                {x:3, y:-7},
                {x:3, y:-6},
                {x:3, y:-5},
                {x:2, y:-5},
                {x:2, y:-3},
                {x:1, y:-3},
                {x:1, y:-2},
        
                {x:7, y:-3},
                {x:6, y:-3},
                {x:5, y:-3},
                {x:5, y:-2},
                {x:3, y:-2},
                {x:3, y:-1},
                {x:2, y:-1},
        
                {x:3, y:7},
                {x:3, y:6},
                {x:3, y:5},
                {x:2, y:5},
                {x:2, y:3},
                {x:1, y:3},
                {x:1, y:2},
        
                {x:7, y:3},
                {x:6, y:3},
                {x:5, y:3},
                {x:5, y:2},
                {x:3, y:2},
                {x:3, y:1},
                {x:2, y:1},
        
                {x:-3, y:7},
                {x:-3, y:6},
                {x:-3, y:5},
                {x:-2, y:5},
                {x:-2, y:3},
                {x:-1, y:3},
                {x:-1, y:2},
        
                {x:-7, y:3},
                {x:-6, y:3},
                {x:-5, y:3},
                {x:-5, y:2},
                {x:-3, y:2},
                {x:-3, y:1},
                {x:-2, y:1},
            ];
           !hover?brushSelector(
            pulsarBrush,
            xPos, yPos):brushSelector(
                pulsarBrush,
                xPos, yPos, true);
           break; 
        }
        default: { 
            !hover?brushSelector([{x: 0,y: 0}],xPos, yPos):brushSelector([{x: 0,y: 0}],xPos, yPos, true);
           break; 
        } 
     } 
}

//Render Selection
function addSelection(xPos:string, yPos:string){
    //Getting clicked Position
    activateCell(xPos, yPos, true);

    //Draw if mouse is down
    if(mouseDown){
        activateCell(xPos, yPos);
    }
}
//Remove Selection
function removeSelection(xPos:string, yPos:string){
    activateCell(xPos, yPos, true);
}

function brushSelector(brush: Array<{x:number, y:number}>, xPos:string, yPos:string, hover?:boolean){
    //If Hovermode toggle hover effect
    if(hover){
        brush.forEach(
            cell => document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`)?
        document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`)?.classList.toggle("mouse-over"):null);
    } else{
        brush.forEach(cell => isPencil?document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`)?.classList.add("alive"):(document.getElementById(`${(parseInt(xPos) + cell.x) + "_" + (parseInt(yPos) + cell.y)}`)?.classList.remove("alive")));
    }
}

//Abfrage der Nachbarn
function scanForNeighbours(){
    let neighbours;
    cellTable.forEach(element=> {
        neighbours = 0;
        //console.log(cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`));
            //console.log(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`);
            cellTable.get(`${(parseInt(element.dataset.x)-1).toString()}_${(parseInt(element.dataset.y)-1).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)-1).toString()}_${(parseInt(element.dataset.y)-1).toString()}`).classList.contains("alive")&&neighbours++;
            cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y)-1).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y)-1).toString()}`).classList.contains("alive")&&neighbours++;
            cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)-1).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)-1).toString()}`).classList.contains("alive")&&neighbours++;
            cellTable.get(`${(parseInt(element.dataset.x)-1).toString()}_${(parseInt(element.dataset.y)).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)-1).toString()}_${(parseInt(element.dataset.y)).toString()}`).classList.contains("alive")&&neighbours++;
            cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)).toString()}`).classList.contains("alive")&&neighbours++;
            cellTable.get(`${(parseInt(element.dataset.x)-1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)-1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`).classList.contains("alive")&&neighbours++;
            cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y)+1).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)).toString()}_${(parseInt(element.dataset.y)+1).toString()}`).classList.contains("alive")&&neighbours++;
            cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`)&&cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`).classList.contains("alive")&&neighbours++;
            //console.log(neighbours.toString());
            element.dataset.neighbours = neighbours.toString();
    })
    changeStates();
}

function changeStates(){
    //console.log(parseInt(element.dataset.neighbours));
    cellTable.forEach(element=> {
       if((!element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)===3)){
        element.classList.add("alive");
        element.classList.remove("died");
       }
       if((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)<2)){
        element.classList.remove("alive");
        element.classList.add("died");
       }
       if((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)>3)){
        element.classList.remove("alive");
        element.classList.add("died");
       }

       //((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)===2));
       //((element.classList.contains("alive")) && (parseInt(element.dataset.neighbours)===3));
    });
}

function playSimulation(){
    if(play){
        scanForNeighbours();
        setTimeout(() => {  playSimulation(); }, speed);
    }
}

function clearCanvas(){
    cellTable.forEach(function(cell){cell.classList.remove("died");cell.classList.remove("alive")})
    startAndStop(true);
}

function switchBrush(pBrush:string){
    brush = pBrush;
}

function fillRandom(){
    clearCanvas();
        cellTable.forEach(
            function(cell){
                let randomNumber: number = getRandomInt(5);
                if(randomNumber=== 1){
                    cell.classList.add("alive");
                }
            });
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }