//This file contains all of the functions used in the project

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
  let element;

  for (key in htmlStructure) {
    element = document.createElement(htmlStructure[key][0]);
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
 * Replaces the innerText of elements in @elements with the values of the corresponding keys from @content
 * @param {object} elements {element name: HTML element}
 * @param {object} content {element name: text}
 */
function elementTextChanger(elements, content) {
  for (key in elements) {
    if (typeof content[key] !== "undefined") {
      elements[key].innerText = content[key];
    }
  }
}

/**
 * Replaces the innerText of elements in @elements with the values of the corresponding keys from @content
 * @param {object} elements {element name: HTML element}
 * @param {object} attributes {element name: {"attribute name", "attribute value"}}
 */
function elementAttributeSet(elements, attributes) {
  for (key in elements) {
    if (typeof attributes[key] !== "undefined") {
      for (attribute in attributes[key])
        elements[key].setAttribute(attribute, attributes[key][attribute]);
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
 * Creates a table inside an html container specified by @tableContainer
 * The number of rows is equal to the number of values in @dataArray
 * @param {string} tableContainer the selector of the elements wherein the table is to be created e.g. ".className", "#id"
 * @param {Array} dataArray an array of objects containing data based on which the table is created
 * @param {object} dataArray[] {label:value}
 * @param {string} className the name to be added to the beginning of the class names of the table parts
 */

function tableCreator(tableContainer, className, dataArray) {
  let cellLabel;
  let cellContent;
  let cellButton;

  //Creating the head row
  let row = elementCreator(tableContainer, { "row--head": ["div"] }, className);
  //Creating cells of the head row
  for (label in dataArray[0]) {
    let hcell = elementCreator(
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
        { "cell--label": ["div"] },
        `${className}row-`
      );
      cellLabel["cell--label"].innerText = label;

      //Creating content cells of the row
      cellContent = elementCreator(
        row.row,
        { "cell--content": ["div"] },
        `${className}row-`
      );
      cellContent["cell--content"].innerText = item[label];
    }
    cellButton = elementCreator(
      row.row,
      { "cell--btn": ["button"] },
      `${className}row-`
    );
    cellButton["cell--btn"].innerText = "BUY TICKETS";
  }
}

/**
 * If the input is older than 10 days ago, the function returns the time difference between input and the current time in a natural way (some minutes/days ago, yesterday, etc.), otherwise it returns the date of the input (if it's in the same year, it ommits the year).
 * @param {integer} date a timestamp
 */
function naturalDate(inputDate) {
  //Difference between two dates in minutes
  let diff = (Date.now() - inputDate) / (60 * 1000);
  let date = new Date(inputDate);
  return diff < 1
    ? "Seconds ago"
    : Math.round(diff) < 2
    ? "A minute ago"
    : Math.round(diff) < 60
    ? `${Math.round(diff)} minutes ago`
    : Math.round(diff / 60) < 2
    ? "An hour ago"
    : Math.round(diff / 60) < 24
    ? `${Math.round(diff / 60)} hours ago`
    : Math.round(diff / 24 / 60) < 2
    ? "Yesterday"
    : Math.round(diff / 24 / 60) < 11
    ? `${Math.round(diff / 24 / 60)} days ago`
    : date.getFullYear() === new Date().getFullYear()
    ? date.toDateString().slice(4, -4)
    : date.toDateString().slice(4);
}

function displayServerComments(response) {
  let commentsArray = response.data;
  //Changing the timestamp of all comments to readable dates
  for (comment of commentsArray) comment.date = naturalDate(comment.timestamp);
  //Displaying the comments
  let tags = [];
  for (i in commentsArray)
    tags[i] = elementCreator(
      ".comments__past",
      htmlStructure,
      "comments__past-",
      `${i}`
    );
  commentsArray = commentsArray.reverse();
  for (i in tags) {
    elementTextChanger(tags[i], commentsArray[i]);
    elementAttributeSet(tags[i], attributes);
  }
  return [tags, commentsArray];
}
