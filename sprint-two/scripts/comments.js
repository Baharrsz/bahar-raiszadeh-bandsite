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

//creating html code for the three previous comments
let pastComments = document.querySelector(".comments__past-comments");
var tags = []; //will contain all html tags are created below
for (let i = 0; i <= 2; i++) {
  var avatar = document.createElement("img");
  avatar.classList.add("comments__past-comments-avatar", "comments__avatar");
  avatar.setAttribute("src", comments[i].avatar);
  pastComments.appendChild(avatar);

  var id = document.createElement("div"); //id contains the name and the date of a comment
  id.classList.add("comments__past-comments-id");
  pastComments.appendChild(id);

  var userName = document.createElement("div");
  userName.classList.add("comments__past-comments-id-name");
  userName.innerText = comments[i].name;
  id.appendChild(userName);

  var date = document.createElement("div");
  date.classList.add("comments__past-comments-id-date");
  date.innerText = comments[i].date;
  id.appendChild(date);

  var comment = document.createElement("div");
  comment.classList.add("comments__past-comments-comment");
  comment.innerText = comments[i].comment;
  pastComments.appendChild(comment);
  tags[i] = {
    avatar: avatar,
    id: id,
    userName: userName,
    date: date,
    comment: comment
  };
}

//Getting the new comment from the user input
form = document.querySelector(".comments__new");
form.addEventListener("submit", click => {
  click.preventDefault();
  let newComment = {};
  newComment.name = click.target.name.value;
  newComment.comment = click.target.comment.value;
  submissionDate = new Date();
  submissionDay = submissionDate.getDate();
  submissionMonth = submissionDate.getMonth() + 1;
  submissionYear = submissionDate.getFullYear();
  newComment.date =
    submissionMonth + "/" + submissionDay + "/" + submissionYear;

  comments.unshift(newComment);

  //Replacing what is displayed with the new data
  for (let i = 0; i <= 2; i++) {
    tags[i].userName.innerText = comments[i].name;
    tags[i].date.innerText = comments[i].date;
    tags[i].comment.innerText = comments[i].comment;
  }
});
