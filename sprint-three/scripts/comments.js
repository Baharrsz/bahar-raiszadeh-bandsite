/**
 * This file creates the comments section of 'index.html' .
It contains the data sets for creating this sections.
 */

//htmlStructure specifies how different parts of the comments section are structured in the html file.
//container-name: [tag-name, parent-container]
//To be used as the input of elementCreator
let htmlStructure = {
  commentbox: ["div"],
  avatarbox: ["div", "commentbox"],
  avatar: ["img", "avatarbox"],
  body: ["div", "commentbox"],
  title: ["div", "body"],
  name: ["div", "title"],
  date: ["div", "title"],
  comment: ["div", "body"]
};

let tags = [];
let comments;

axios //Getting previous comments from the server
  .get("https://project-1-api.herokuapp.com/comments?api_key=bahar")
  .then(response => {
    comments = response.data;
    //Changing the timestamp of all comments to readable dates
    for (comment of comments) comment.date = naturalDate(comment.timestamp);
    //Displaying the comments
    for (i in comments)
      tags[i] = elementCreator(
        ".comments__past",
        htmlStructure,
        "comments__past-"
      );
    comments = comments.reverse();
    for (i in tags) elementTextChanger(tags[i], comments[i]);
  });

//Getting the new comment from the user input
form = document.querySelector(".comments__new");
form.addEventListener("submit", click => {
  click.preventDefault();
  let serverPost = {};
  serverPost.name = click.target.name.value;
  serverPost.comment = click.target.comment.value;
  click.target.reset();

  axios
    .post(
      //Sending the new comment to the server
      "https://project-1-api.herokuapp.com/comments?api_key=bahar",
      serverPost
    )
    .then(response => {
      //Getting the new comment back from the server
      let newComment = response.data;
      comments.unshift(newComment);
      for (i of comments) i.date = naturalDate(i.timestamp);

      //Displaying the new comment and refreshing the date of all comments that are displayed
      tags.push(
        elementCreator(".comments__past", htmlStructure, "comments__past-")
      );
      for (i in comments) elementTextChanger(tags[i], comments[i]);
    });
});
