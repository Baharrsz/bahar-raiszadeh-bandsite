/**
 *
 * @param {object} table The table tag fetched from the document
 * @param {array} dataTable Information of tours. Each row is an object
 *
 * The function wirtes the information of the dataTable into a table in the document
 */
function createTable(table, dataArray) {
  //Creating label rows
  //   let div = document.createElement("div");
  for (tour of dataArray) {
    let row = table.insertRow();
    row.classList.add("shows-content__table-label-row");

    for (key in dataArray[0]) {
      let cell = row.insertCell();
      let text = document.createTextNode(key);
      cell.appendChild(text);
    }
    // div.appendChild(row);
    //   }

    //   for (tour of dataArray) {
    // Creating content row
    row = table.insertRow();
    row.classList.add("shows-content__table-content-row");
    for (key in tour) {
      cell = row.insertCell();
      text = document.createTextNode(tour[key]);
      cell.appendChild(text);
    }
  }
}

let tourInfo = [
  {
    date: "Mon Dec 17 2019",
    venue: "Ronald Lane",
    location: "San Fancisco, CA"
  },
  {
    date: "Tue Jul 18 2019",
    venue: "Pier 3 East",
    location: "San Fancisco, CA"
  },
  {
    date: "Fri Jul 22 2019",
    venue: "View Loungue",
    location: "San Fancisco, CA"
  },
  {
    date: "Sat Aug 12 2019",
    venue: "Hyatt Agency",
    location: "San Fancisco, CA"
  },
  {
    date: "Fri Sep 05 2019",
    venue: "Moscow Center",
    location: "San Fancisco, CA"
  },
  { date: "Wed Aug 11 2019", venue: "Pres Club", location: "San Fancisco, CA" }
];

let table = document.querySelector("table");

createTable(table, tourInfo);
// createHeader(table, tourInfo);
