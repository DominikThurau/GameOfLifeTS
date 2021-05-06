import { activateCell, addSelection, removeSelection } from "./brushes";
import { columSlider, field, rowSlider } from "./dom-utils";
import { cellTable } from "./index";

//Render gamefield
export function generateField() {
    //clear the field
    field ? (field.innerHTML = "") : null;
  
    for (let yPos = 0; yPos < parseInt(rowSlider.value); yPos++) {
      //Create one Row
      let currentRow = document.createElement("div");
      currentRow.classList.add("row");
  
      for (let xPos = 0; xPos < parseInt(columSlider.value); xPos++) {
        let newCell = document.createElement("div");
        newCell.id = xPos + "_" + yPos;
        newCell.classList.add("cell");
        newCell.classList.add("dead");
        newCell.setAttribute("data-x", xPos.toString());
        newCell.setAttribute("data-y", yPos.toString());
        newCell.setAttribute("data-neighbours", "0");
        newCell.addEventListener("mouseover", function () {
          addSelection(
            this.dataset.x?.toString() as string,
            this.dataset.y?.toString() as string
          );
        });
        newCell.addEventListener("mouseout", function () {
          removeSelection(
            this.dataset.x?.toString() as string,
            this.dataset.y?.toString() as string
          );
        });
        newCell.addEventListener("click", function () {
          activateCell(
            this.dataset.x?.toString() as string,
            this.dataset.y?.toString() as string
          );
        });
        currentRow.appendChild(newCell); //`<div class="cell dead" draggable="false" id="${xPos +"_" + yPos}" data-x="${xPos}" data-y="${yPos}" data-neighbours="0" onmouseover="addSelection(this.dataset.x, this.dataset.y)" onmouseout="removeSelection(this.dataset.x, this.dataset.y)" onclick="activateCell(this.dataset.x, this.dataset.y)"></div>`;
      }
  
      field ? field.appendChild(currentRow) : null;
    }
  
    for (let yPos = 0; yPos < parseInt(rowSlider.value); yPos++) {
      for (let xPos = 0; xPos < parseInt(columSlider.value); xPos++) {
        cellTable.set(
          `${xPos + "_" + yPos}`,
          document.getElementById(xPos + "_" + yPos)
        );
      }
    }
  }
