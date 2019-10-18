let comments = [];
comments[0] = { name: "a", comment: "@", date: "1" };
comments[1] = { name: "b", comment: "@", date: "1" };
comments[2] = { name: "c", comment: "@", date: "1" };

//creating html code for the three previous comments
let pastComments = document.querySelector(".comments__past-comments");
var tags = []; //will contain all html tags are created below
for (let i = 0; i <= 2; i++) {
  var avatar = document.createElement("div");
  avatar.classList.add("comments__past-comments-avatar");
  pastComments.appendChild(avatar);

  var id = document.createElement("div"); //id contains the name and the date of a comment
  id.classList.add("comments__past-comments-id");
  pastComments.appendChild(id);

  var userName = document.createElement("div");
  userName.classList.add("comments__past-comments-id-name");
  userName.innerHTML = comments[i].name;
  id.appendChild(userName);

  var date = document.createElement("div");
  date.classList.add("comments__past-comments-id-date");
  date.innerHTML = comments[i].date;
  id.appendChild(date);

  var comment = document.createElement("div");
  comment.classList.add("comments__past-comments-comment");
  comment.innerHTML = comments[i].comment;
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
  submissionDay = submissionDate.getDay();
  submissionMonth = submissionDate.getMonth();
  submissionYear = submissionDate.getFullYear();
  newComment.date =
    submissionMonth + "/" + submissionDay + "/" + submissionYear;

  comments.unshift(newComment);

  //Replacing what is displayed with the new data
  for (let i = 0; i <= 2; i++) {
    tags[i].userName.innerHTML = comments[i].name;
    tags[i].date.innerHTML = comments[i].date;
    tags[i].comment.innerHTML = comments[i].comment;
  }
});
