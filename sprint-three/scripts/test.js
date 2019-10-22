//

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
let structure = {
  comment: ["div"],
  avatarbox: ["div", "comment"],
  avatar: ["img", "avatarbox"],
  body: ["div", "comment"],
  title: ["div", "body"],
  userName: ["div", "title"],
  date: ["div", "title"],
  message: ["section", "body"]
};

a = elementCreator("div", structure, "div__", "div");

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

// Data for the table
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
  {
    DATE: "Wed Aug 11 2019",
    VENUE: "Press Club",
    LOCATION: "San Fancisco, CA"
  }
];
tableCreator("section", "table__", tourInfo);

function naturalDate(date) {
  //Difference between two dates in minutes
  let diff = (Date.now() - date) / (60 * 1000);
  if (diff < 1) return "just now";
  else if (Math.round(diff) < 2) return "a minute ago";
  else if (Math.round(diff) < 60) return `${Math.round(diff)} minutes ago`;
  else if (Math.round(diff / 60) < 2) return "an hour ago";
  else if (Math.round(diff / 60) < 24)
    return `${Math.round(diff / 60)} hours ago`;
  else if (Math.round(diff / 24 / 60) < 2) return "yesterday";
  else if (Math.round(diff / 24 / 60) < 11)
    return `${Math.round(diff / 24 / 60)} days ago`;
  else return new Date(date).toDateString();
}
let d1 = new Date(1571785474225);
let d2 = new Date().getTime();
// console.log(d1);
// console.log(d2);

console.log(naturalDate(1571785474225));
