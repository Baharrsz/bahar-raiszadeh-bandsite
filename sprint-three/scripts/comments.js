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
  comment: ["div", "body"],
  actions: ["div", "body"],
  likebox: ["div", "actions"],
  likebtn: ["button", "likebox"],
  likeicon: ["img", "likebtn"],
  likes: ["div", "likebox"],
  delete: ["button", "actions"],
  deleteicon: ["img", "delete"]
};

let attributes = {
  likeicon: { src: "./assets/icons/svg/like.svg", name: "like" },
  deleteicon: { src: "./assets/icons/svg/delete.svg", name: "delete" },
  avatar: { src: "./assets/icons/svg/user.svg" }
};

let tags;
let comments;

axios
  .get("https://project-1-api.herokuapp.com/comments?api_key=bahar") //Getting previous comments from API
  .then(response => {
    [tags, comments] = commentsSectionConstructor(response, tags, comments);
    // [tags, comments] = displayServerComments(response, tags, comments); //Displaying new comments
    // let allButtons = document.querySelectorAll(
    //   ".comments__past-commentbox button"
    // );
    // for (button of allButtons) {
    //   actionOnComments(button, tags, comments);
    // }
  });

//Getting the new comment from the user input
let form = document.querySelector(".comments__new");
form.addEventListener("submit", click => {
  click.preventDefault();
  let serverPost = {};
  serverPost.name = click.target.name.value;
  serverPost.comment = click.target.comment.value;
  click.target.reset();

  axios
    .post(
      //Sending the new comment to the API
      "https://project-1-api.herokuapp.com/comments?api_key=bahar",
      serverPost
    )
    .then(response => {
      //Getting the new comment back from the API
      [tags, comments] = commentsSectionConstructor(response, tags, comments);
    });
});
