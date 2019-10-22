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
  let container;
  if (typeof containerSelector.tagName !== "undefined") {
    container = containerSelector;
  } else {
    container = document.querySelector(containerSelector);
  }
  let parent = container;
  let result = {};
  let classNames = {};

  for (key in htmlStructure) {
    let element = document.createElement(htmlStructure[key][0]);
    classNames[key] = className;

    for (i in htmlStructure) {
      if (`${htmlStructure[key][1]}` === i) {
        parent = result[i];
        classNames[key] = `${classNames[i]}-`;
      }
    }
    classNames[key] = `${classNames[key]}${key}`;
    element.classList.add(classNames[key]);
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
    if (typeof elements[key] !== "undefined") {
      // console.log("element", elements[key]);
      // console.log("content", content[key]);

      elements[key].innerText = content[key];
      // console.log("2.element", elements[key]);
      // console.log("2.content", content[key]);
    }
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

function tableCreator(tableContainer, className, inputArray) {
  let dataArray = inputArray.slice();
  let row;
  let cellLabel;
  let cellContent;

  //Creating the head row
  row = elementCreator(tableContainer, { "row--head": ["div"] }, className);
  //Creating cells of the head row
  for (label in dataArray[0]) {
    hcell = elementCreator(
      row["row--head"],
      { "cell--head": ["div"] },
      `${className}row-`
    );
    hcell["cell--head"].innerText = label;
  }

  //Creating the other rows
  for (item of dataArray) {
    row = elementCreator(tableContainer, { row: ["div"] }, className);
    //Creating label cells of the row
    for (label in item) {
      cellLabel = elementCreator(
        row.row,
        { "cell-label": ["div"] },
        `${className}row-`
      );
      cellLabel["cell-label"].innerText = label;

      //Creating content cells of the row
      cellContent = elementCreator(
        row.row,
        { "cell-content": ["div"] },
        `${className}row-`
      );
      cellContent["cell-content"].innerText = item[label];
    }
  }
}
