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

//Creating the html for displaying the previous comments
let tags = [];
for (index = 0; index <= 2; index++) {
  tags[index] = elementCreator(
    ".comments__past",
    htmlStructure,
    "comments__past-"
  );
}

axios //Getting previous comments from the server
  .get("https://project-1-api.herokuapp.com/comments?api_key=bahar")
  .then(response => {
    comments = response.data;
    return comments;
  })
  .then(comments => {
    for (comment of comments) {
      comment.date = naturalDate(comment.timestamp);
    }
    return comments;
  })
  .then(comments => {
    for (i in tags) {
      elementTextChanger(tags[i], comments[i]);
    }
  });

//Getting the new comment from the user input
form = document.querySelector(".comments__new");
form.addEventListener("submit", click => {
  click.preventDefault();
  let serverPost = {};
  serverPost.name = click.target.name.value;
  serverPost.comment = click.target.comment.value;

  axios
    .post(
      //Sending the new comment to the server
      "https://project-1-api.herokuapp.com/comments?api_key=bahar",
      serverPost
    )
    .then(response => {
      //Getting the new comment from the server
      let newComment = response.data;
      comments.unshift(newComment);
      for (i of comments) i.date = naturalDate(i.timestamp);

      return comments;
    })
    .then(comments => {
      //Displaying the new comment and refreshing the date of all comments that are displayed
      for (let i = 0; i <= 2; i++) {
        elementTextChanger(tags[i], comments[i]);
      }
    });
});
