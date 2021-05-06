import {} from "./dom-utils";
import { cellTable, changeStates } from "./index";

//Abfrage der Nachbarn
export function scanForNeighbours() {
    let neighbours;
    cellTable.forEach((element) => {
      neighbours = 0;
      //console.log(cellTable.get(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`));
      //console.log(`${(parseInt(element.dataset.x)+1).toString()}_${(parseInt(element.dataset.y)+1).toString()}`);
      cellTable.get(
        `${(parseInt(element.dataset.x) - 1).toString()}_${(
          parseInt(element.dataset.y) - 1
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${(parseInt(element.dataset.x) - 1).toString()}_${(
              parseInt(element.dataset.y) - 1
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      cellTable.get(
        `${parseInt(element.dataset.x).toString()}_${(
          parseInt(element.dataset.y) - 1
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${parseInt(element.dataset.x).toString()}_${(
              parseInt(element.dataset.y) - 1
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      cellTable.get(
        `${(parseInt(element.dataset.x) + 1).toString()}_${(
          parseInt(element.dataset.y) - 1
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${(parseInt(element.dataset.x) + 1).toString()}_${(
              parseInt(element.dataset.y) - 1
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      cellTable.get(
        `${(parseInt(element.dataset.x) - 1).toString()}_${parseInt(
          element.dataset.y
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${(parseInt(element.dataset.x) - 1).toString()}_${parseInt(
              element.dataset.y
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      cellTable.get(
        `${(parseInt(element.dataset.x) + 1).toString()}_${parseInt(
          element.dataset.y
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${(parseInt(element.dataset.x) + 1).toString()}_${parseInt(
              element.dataset.y
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      cellTable.get(
        `${(parseInt(element.dataset.x) - 1).toString()}_${(
          parseInt(element.dataset.y) + 1
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${(parseInt(element.dataset.x) - 1).toString()}_${(
              parseInt(element.dataset.y) + 1
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      cellTable.get(
        `${parseInt(element.dataset.x).toString()}_${(
          parseInt(element.dataset.y) + 1
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${parseInt(element.dataset.x).toString()}_${(
              parseInt(element.dataset.y) + 1
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      cellTable.get(
        `${(parseInt(element.dataset.x) + 1).toString()}_${(
          parseInt(element.dataset.y) + 1
        ).toString()}`
      ) &&
        cellTable
          .get(
            `${(parseInt(element.dataset.x) + 1).toString()}_${(
              parseInt(element.dataset.y) + 1
            ).toString()}`
          )
          .classList.contains("alive") &&
        neighbours++;
      //console.log(neighbours.toString());
      element.dataset.neighbours = neighbours.toString();
    });
    changeStates();
  }