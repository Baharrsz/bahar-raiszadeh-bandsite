let comments = [];
comments[0] = {
  name: "Micheal Lyons",
  comment:
    "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.",
  date: " 12/18/2018",
  avatar: "./assets/images/user1.jpg"
};
comments[1] = {
  name: "Gary Wong",
  comment:
    "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
  date: " 12/12/2018",
  avatar: "./assets/images/user2.jpg"
};
comments[2] = {
  name: "Theodore Duncan",
  comment:
    "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
  date: " 11/15/2018",
  avatar: "./assets/images/user3.jpg"
};

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

function elementCreator(containerElement, htmlStructure, className) {
  let container = document.querySelector(containerElement);
  console.log(container);

  let parent = container;
  let result = {};

  for (key in htmlStructure) {
    let element = document.createElement(htmlStructure[key][0]);

    for (i in htmlStructure) {
      if (`${htmlStructure[key][1]}` === i) {
        parent = result[i];
        className = `${className}${i}-`;
      }
    }
    element.classList.add(`${className}${key}`);
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

// function objectCreater(key, index, tag) {
//   key = `${key}--${index}`;
//   let result = {};
//   result[key] = tag;
//   return result;
// }

// console.log(objectCreater("cell", "venue", "div"));

function tableCreator(tableContainer, dataArray, labelOrContent) {
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
      cell.classList.add(
        "shows-tours__table-cell",
        `shows-tours__table-cell--${labelOrContent}`
      );
      row.appendChild(cell);

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

tableCreator(".table", tourInfo, "content");

htmlStructure = {
  image: ["img", ""],
  part: ["div", ""],
  subpart: ["div", "part"]
};

text = {
  image: "photo",
  subpart: "empty"
};

let tags = elementCreator(".test", htmlStructure, "test__");
elementTextChanger(tags, text);
console.log(typeof tags.image.classList[0]);

// let contentrows = document.createElement("div");
// contentrows.classList.add("shows-tours__table-section--content");
// table.appendChild(contentrows);
// for (tour of dataArray) {
//   let row = document.createElement("div");
//   row.classList.add(
//     "shows-tours__table-row",
//     "shows-tours__table-row--content"
//   );
//   contentrows.appendChild(row);

//   for (key in tour) {
//     let cell = document.createElement("div");
//     cell.classList.add("shows-tours__table-content-cell");
//     cell.innerText = tour[key];
//     row.appendChild(cell);
//   }

//   let btn = document.createElement("button");
//   btn.innerHTML = "BUY TICKETS";
//   btn.classList.add(
//     "shows-tours__table-content-cell",
//     "shows-tours__table-content-cell--btn",
//     "btn"
//   );
//   row.appendChild(btn);
// }

//creating html code for the three previous comments
// let pastComments = document.querySelector(".comments__past-comments");
// var tags = []; //will contain all html tags are created below
// for (let i = 0; i <= 2; i++) {
//   var avatar = document.createElement("img");
//   avatar.classList.add("comments__past-comments-avatar", "comments__avatar");
//   avatar.setAttribute("src", comments[i].avatar);
//   pastComments.appendChild(avatar);

//   var id = document.createElement("div"); //id contains the name and the date of a comment
//   id.classList.add("comments__past-comments-id");
//   pastComments.appendChild(id);

//   var userName = document.createElement("div");
//   userName.classList.add("comments__past-comments-id-name");
//   userName.innerText = comments[i].name;
//   id.appendChild(userName);

//   var date = document.createElement("div");
//   date.classList.add("comments__past-comments-id-date");
//   date.innerText = comments[i].date;
//   id.appendChild(date);

//   var comment = document.createElement("div");
//   comment.classList.add("comments__past-comments-comment");
//   comment.innerText = comments[i].comment;
//   pastComments.appendChild(comment);
//   tags[i] = {
//     avatar: avatar,
//     id: id,
//     userName: userName,
//     date: date,
//     comment: comment
//   };
// }

// //Getting the new comment from the user input
// form = document.querySelector(".comments__new");
// form.addEventListener("submit", click => {
//   click.preventDefault();
//   let newComment = {};
//   newComment.name = click.target.name.value;
//   newComment.comment = click.target.comment.value;
//   submissionDate = new Date();
//   submissionDay = submissionDate.getDate();
//   submissionMonth = submissionDate.getMonth() + 1;
//   submissionYear = submissionDate.getFullYear();
//   newComment.date =
//     submissionMonth + "/" + submissionDay + "/" + submissionYear;

//   comments.unshift(newComment);

//   //Replacing what is displayed with the new data
//   for (let i = 0; i <= 2; i++) {
//     tags[i].userName.innerText = comments[i].name;
//     tags[i].date.innerText = comments[i].date;
//     tags[i].comment.innerText = comments[i].comment;
//   }
// });
