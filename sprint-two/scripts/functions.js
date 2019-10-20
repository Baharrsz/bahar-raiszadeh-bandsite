//This file contains all of the functions used in the projects

function elementCreator(containerSelector, htmlStructure, className, idName) {
  let container = document.querySelector(containerSelector);
  let parent = container;
  let result = {};
  let originalClassName = className;

  for (key in htmlStructure) {
    let element = document.createElement(htmlStructure[key][0]);

    for (i in htmlStructure) {
      if (`${htmlStructure[key][1]}` === i) {
        parent = result[i];
        className = `${originalClassName}${i}-`;
      }
    }
    element.classList.add(`${className}${key}`);
    if (idName) {
      element.setAttribute("id", `${idName}-${key}`);
    }
    parent.appendChild(element);
    result[key] = element;
  }
  return result;
}

function elementTextChanger(elements, content) {
  for (key in content) {
    elements[key].innerText = content[key];
  }
}

function objectCreater(keyArray, valueArray) {
  let result = {};
  for (key in keyArray) {
    result[keyArray[key]] = valueArray[key];
  }
  return result;
}

function tableCreator(tableContainer, dataArray, labelOrContent, tableId) {
  let table = elementCreator(
    tableContainer,
    { section: ["div"] },
    "shows-tours__table-",
    tableId
  );
  let className = `shows-tours__table-section--${labelOrContent}`;
  table.section.classList.add(className);

  for (item in dataArray) {
    //Creating rows
    let row = elementCreator(
      `#${tableId}-section`,
      objectCreater([`row--${item}`], [["div"]]),
      "shows-tours__table-",
      `${tableId}`
    );

    //Creating ordinary cells inside the row:
    let cells = {};
    for (key in dataArray[item]) {
      let cell = elementCreator(
        `#${tableId}-row--${item}`,
        objectCreater([key], [["div"]]),
        "shows-tours__table-cell--"
      );
      cells[key] = cell[key];
    }
    //Creating a button cell inside the row
    let cell = elementCreator(
      `#${tableId}-row--${item}`,
      { btn: ["button"] },
      "shows-tours__table-cell--"
    );
    cell.btn.classList.add("btn");
    cell.btn.innerHTML = "BUY TICKETS";

    //Adding text to the cells
    if (labelOrContent === "label") {
      dataArray[item] = objectCreater(
        Object.keys(dataArray[item]),
        Object.keys(dataArray[item])
      );
    }
    elementTextChanger(cells, dataArray[item]);
  }
}

// htmlStructure = {
//   image: ["img", ""],
//   part: ["div", ""],
//   subpart: ["div", "part"]
// };

// text = {
//   image: "photo",
//   subpart: "empty"
// };

// let tags = elementCreator(".test", htmlStructure, "test__", "test-id");
// elementTextChanger(tags, text);
// console.log(typeof tags.image.classList[0]);

//
