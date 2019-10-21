//This file contains all of the functions used in the projects

/**
 * Creats an HTML structure inside an element and returns an object containing created tags
 * @param {string} containerSelector the selector of the elements wherein the structure is to be created e.g. ".className", "#id"
 * @param {object} htmlStructure on object that dtermines the HTML structure to be created
 * @param {string} htmlStructure.key the element name
 * @param {Array} htmlStructure.value [element's tag name {string}, element's parent {string}, if not entered, the element is created in the element selected by containderSelector]
 * @param {string} className the name to be added to the beginning of the class name of the created elements
 * @param {string} idName if entered, the beginning of the created elements id
 * @return {object} {element name: HTML element}
 */
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

/**
 * Replaces the innerText of elements in @elements based on the values of the corresponding keys from @content
 * All keys of @elements must be found in keys of @content
 * @param {object} elements {element name: HTML element}
 * @param {object} content {element name: text}
 */
function elementTextChanger(elements, content) {
  for (key in content) {
    elements[key].innerText = content[key];
  }
}

/**
 * Creates an object using values of @keyArray as keys and values of @valueArray as values
 * @param {Array} keyArray
 * @param {Array} valueArray
 * @return {object}
 */
function objectCreater(keyArray, valueArray) {
  let result = {};
  for (key in keyArray) {
    result[keyArray[key]] = valueArray[key];
  }
  return result;
}

/**
 * Creates a table inside an html container specified by @tableContainer.
 * The number of rows is equal to the number of values in inputArray
 * If @labelOrContent is "label" each cell of the table is filled with key values of @inputArray , otherwise values are used
 * @param {string} tableContainer the selector of the elements wherein the table is to be created e.g. ".className", "#id"
 * @param {Array} inputArray an array of objects containing data based on which the table is created
 * @param {object} inputArray[] {label:value}
 * @param {string} labelOrContent determines if the table displays keys or values of @inputArray
 * @param {string} tableId if entered, the id of the table to be created
 */
function tableCreator(tableContainer, inputArray, labelOrContent, tableId) {
  let dataArray = inputArray.slice();

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
