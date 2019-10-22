/**
 * This file creates the comments section of 'index.html' .
It contains the data sets for creating this sections.
 */

//The 3 default comments displayed in the comments section
// let comments = [];
// comments[0] = {
//   name: "Micheal Lyons",
//   message:
//     "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.",
//   date: " 12/18/2018"
// };
// comments[1] = {
//   name: "Gary Wong",
//   message:
//     "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
//   date: " 12/12/2018"
// };
// comments[2] = {
//   name: "Theodore Duncan",
//   message:
//     "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
//   date: " 11/15/2018"
// };

//htmlStructure specifies how different parts of the comments section are structured in the html file.
//container-name: [tag-name, parent-container]
//To be used as the input of elementCreator
let htmlStructure = {
  "comment-box": ["div"],
  "avatar-box": ["div", "comment-box"],
  avatar: ["img", "avatar-box"],
  body: ["div", "comment-box"],
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
console.log(tags);

// //Displaying the 3 default comments
// for (i in comments) {
//   elementTextChanger(tags[i], comments[i]);
// }

axios
  .get("https://project-1-api.herokuapp.com/comments?api_key=b")
  .then(res => {
    comments = res.data;
    // console.log(comments);
    return comments;
  })
  .then(comments => {
    for (i in tags) {
      elementTextChanger(tags[i], comments[i]);
      console.log("element", tags[i]);
      console.log("content", comments[i]);
      // console.log(tags[i]);
    }
  });

//Getting the new comment from the user input
form = document.querySelector(".comments__new");
form.addEventListener("submit", click => {
  click.preventDefault();
  let newComment = {};
  newComment.userName = click.target.name.value;
  newComment.message = click.target.comment.value;
  submissionDate = new Date();
  submissionDay = submissionDate.getDate();
  submissionMonth = submissionDate.getMonth() + 1;
  submissionYear = submissionDate.getFullYear();
  newComment.date =
    submissionMonth + "/" + submissionDay + "/" + submissionYear;

  comments.unshift(newComment);

  //Replacing what is displayed with the new data
  for (let i = 0; i <= 2; i++) {
    elementTextChanger(tags[i], comments[i]);
  }
});
