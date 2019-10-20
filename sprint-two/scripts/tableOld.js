/**
 *
 * @param {object} table The table tag fetched from the document
 * @param {array} dataTable Information of tours. Each row is an object
 *
 * The function wirtes the information of the dataTable into a table in the document
 */

function tableCreator2(tableContainer, dataArray, labelOrContent) {
  let container = document.querySelector(tableContainer);
  let table = document.createElement("div");
  container.appendChild(table);
  let className = `shows-tours__table-section${labelOrContent}`;
  table.classList.add(className);
  for (item of dataArray) {
    //Making rows
    let row = document.createElement("div");
    row.classList.add("shows-tours__table-row");
    table.appendChild(row);

    //Making cells inside the row:
    for (key in item) {
      let cell = document.createElement("div");
      row.appendChild(cell);

      cell.classList.add(
        "shows-tours__table-cell",
        `shows-tours__table-cell--${labelOrContent}`
      );

      //Adding text to the cell
      if (labelOrContent === "label") {
        cell.innerText = key;
      } else {
        cell.innerText = item[key];
      }
    }
    let btn = document.createElement("button");
    btn.classList.add(
      "shows-tours__table-cell",
      `shows-tours__table-cell--${labelOrContent}-btn`,
      "btn"
    );
    row.appendChild(btn);
    btn.innerHTML = "BUY TICKETS";
  }
}

function createTable(table, dataArray) {
  let labelrows = document.createElement("div");
  labelrows.classList.add("shows-tours__table-section--label");
  table.appendChild(labelrows);
  for (tour of dataArray) {
    let row = document.createElement("div");
    row.classList.add(
      "shows-tours__table-row",
      "shows-tours__table-row--label"
    );
    labelrows.appendChild(row);

    for (key in tour) {
      let cell = document.createElement("div");
      cell.classList.add("shows-tours__table-label-cell");
      cell.innerText = key;
      row.appendChild(cell);
    }

    let btn = document.createElement("button");
    btn.innerHTML = "BUY TICKETS";
    btn.classList.add("shows-tours__table-label-cell");
    btn.style.visibility = "hidden";
    row.appendChild(btn);
  }

  let contentrows = document.createElement("div");
  contentrows.classList.add("shows-tours__table-section--content");
  table.appendChild(contentrows);
  for (tour of dataArray) {
    let row = document.createElement("div");
    row.classList.add(
      "shows-tours__table-row",
      "shows-tours__table-row--content"
    );
    contentrows.appendChild(row);

    for (key in tour) {
      let cell = document.createElement("div");
      cell.classList.add("shows-tours__table-content-cell");
      cell.innerText = tour[key];
      row.appendChild(cell);
    }

    let btn = document.createElement("button");
    btn.innerHTML = "BUY TICKETS";
    btn.classList.add(
      "shows-tours__table-content-cell",
      "shows-tours__table-content-cell--btn",
      "btn"
    );
    row.appendChild(btn);
  }
}

let tourInfo = [
  {
    DATE: "Mon Dec 17 2019",
    VENUE: "Ronald Lane",
    LOCATION: "San Fancisco, CA"
  },
  {
    DATE: "Tue Jul 18 2019",
    VENUE: "Pier 3 East",
    LOCATION: "San Fancisco, CA"
  },
  {
    DATE: "Fri Jul 22 2019",
    VENUE: "View Loungue",
    LOCATION: "San Fancisco, CA"
  },
  {
    DATE: "Sat Aug 12 2019",
    VENUE: "Hyatt Agency",
    LOCATION: "San Fancisco, CA"
  },
  {
    DATE: "Fri Sep 05 2019",
    VENUE: "Moscow Center",
    LOCATION: "San Fancisco, CA"
  },
  { DATE: "Wed Aug 11 2019", VENUE: "Press Club", LOCATION: "San Fancisco, CA" }
];

let table = document.querySelector(".shows-tours__table");
createTable(table, tourInfo);
