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
  reply: ["button", "actions"],
  replyicon: ["img", "reply"],
  delete: ["button", "actions"],
  deleteicon: ["img", "delete"]
};

let attributes = {
  likeicon: { src: "./assets/icons/svg/like.svg", name: "like" },
  replyicon: { src: "./assets/icons/svg/reply.svg", name: "reply" },
  deleteicon: { src: "./assets/icons/svg/delete.svg", name: "delete" },
  avatar: { src: "./assets/icons/svg/user.svg" }
};

let replyStructure = {
  input: ["form"],
  "name-text": ["input", "input"],
  "comment-text": ["input", "input"],
  btn: ["button", "input"]
};

let replyAttributes = {
  "name-text": { name: "name" },
  "comment-text": { name: "comment" }
};

let emptyComment = { name: "...", comment: "..." };

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

axios //Getting previous comments from the server
  .get("https://project-1-api.herokuapp.com/comments?api_key=bahar")
  .then(response => {
    [tags, comments] = displayServerComments(response);

    let allComments = document.querySelectorAll(
      ".comments__past-commentbox button"
    );
    for (commentbox of allComments) {
      commentbox.addEventListener("click", function(click) {
        let index = this.id.split("-");
        console.log(index);
        let id = comments[index[0]].id;

        if (index[1] === "likebtn") {
          axios
            .put(
              //Sending the new like to the server
              `https://project-1-api.herokuapp.com/comments/${id}/like?api_key=bahar`,
              ""
            )
            .then(response => {
              comments[index[0]].likes = response.data.likes;
              elementTextChanger(tags[index[0]], comments[index[0]]);
            });
        }
        if (index[1] === "delete") {
          axios
            .delete(
              //Sending the new like to the server
              `https://project-1-api.herokuapp.com/comments/${id}?api_key=bahar`
            )
            .then(response => {
              location.reload();
            });
        }

        if (index[1] === "reply") {
          let commentToReply = document.getElementById(`${index[0]}-body`);

          tags.push(
            elementCreator(
              commentToReply,
              replyStructure,
              "comments__new-",
              "test"
            )
          );

          elementAttributeSet(tags[tags.length - 1], replyAttributes);
          console.log("last tag", tags[tags.length - 1]);

          let formTwo = document.querySelector("#test-input");
          console.log(formTwo);
          formTwo.addEventListener("submit", submit => {
            submit.preventDefault();

            let serverPost = {};
            serverPost.name = submit.target.name.value;
            serverPost.comment = submit.target.comment.value;

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
                  elementCreator(
                    ".comments__past",
                    htmlStructure,
                    "comments__past-"
                  )
                );
                for (i in comments) elementTextChanger(tags[i], comments[i]);
              });
          });

          // tags.push(
          //   elementCreator(commentToReply, htmlStructure, "comments__past-")
          // );
          // elementTextChanger(tags[tags.length - 1], emptyComment);
          // elementAttributeSet(tags[tags.length - 1], attributes);
        }
      });
    }
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
