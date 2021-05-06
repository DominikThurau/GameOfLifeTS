import { brush, isPencil } from "./index";

//Toggling if mouse is down
document.body.onmousedown = function () {

    mouseDown = true;
    console.log(mouseDown);
  };
  document.body.onmouseup = function () {
    mouseDown = false;
    console.log(mouseDown);
  };
  
let mouseDown: boolean = false;
//Bring Cells back to Live or kill them
export function activateCell(xPos: string, yPos: string, hover?: boolean) {
    //const clickedCell = document.getElementById(`x${xPos}/y${yPos}`);
    switch (brush) {
      case "pixelbrush": {
        let pixelBrush = [{ x: 0, y: 0 }];
        //statements;
        !hover
          ? brushSelector(pixelBrush, xPos, yPos)
          : brushSelector(pixelBrush, xPos, yPos, true);
        break;
      }
      case "pentadecathlon": {
        //statements;
        //Brush
        let pentadecathlonBrush = [
          { x: 0, y: 0 },
          { x: 0, y: -1 },
          { x: 0, y: -2 },
          { x: 0, y: -4 },
          { x: 0, y: -5 },
          { x: 0, y: 1 },
          { x: 0, y: 3 },
          { x: 0, y: 4 },
          { x: -1, y: -3 },
          { x: 1, y: -3 },
          { x: -1, y: 2 },
          { x: 1, y: 2 },
        ];
        !hover
          ? brushSelector(pentadecathlonBrush, xPos, yPos)
          : brushSelector(pentadecathlonBrush, xPos, yPos, true);
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
        !hover
          ? brushSelector(pulsarBrush, xPos, yPos)
          : brushSelector(pulsarBrush, xPos, yPos, true);
        break;
      }
      default: {
        !hover
          ? brushSelector([{ x: 0, y: 0 }], xPos, yPos)
          : brushSelector([{ x: 0, y: 0 }], xPos, yPos, true);
        break;
      }
    }
  }

  //Render Selection
export function addSelection(xPos: string, yPos: string) {
    //Getting clicked Position
    activateCell(xPos, yPos, true);
  
    //Draw if mouse is down
    if (mouseDown) {
      activateCell(xPos, yPos);
    }
  }
  //Remove Selection
  export function removeSelection(xPos: string, yPos: string) {
    activateCell(xPos, yPos, true);
  }

  function brushSelector(
    brush: Array<{ x: number; y: number }>,
    xPos: string,
    yPos: string,
    hover?: boolean
  ) {
    //If Hovermode toggle hover effect
    if (hover) {
      brush.forEach((cell) =>
        document.getElementById(
          `${parseInt(xPos) + cell.x + "_" + (parseInt(yPos) + cell.y)}`
        )
          ? document
              .getElementById(
                `${parseInt(xPos) + cell.x + "_" + (parseInt(yPos) + cell.y)}`
              )
              ?.classList.toggle("mouse-over")
          : null
      );
    } else {
      brush.forEach((cell) =>
        isPencil
          ? document
              .getElementById(
                `${parseInt(xPos) + cell.x + "_" + (parseInt(yPos) + cell.y)}`
              )
              ?.classList.add("alive")
          : document
              .getElementById(
                `${parseInt(xPos) + cell.x + "_" + (parseInt(yPos) + cell.y)}`
              )
              ?.classList.remove("alive")
      );
    }
  }