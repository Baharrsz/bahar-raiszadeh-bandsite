/**
 * This file creates the tables of 'shows.html'.
It contains the data sets for creating this sections.
 */

// Data for the table
// let tourInfo = [
//   {
//     DATE: "Mon Dec 17 2019",
//     VENUE: "Ronald Lane",
//     LOCATION: "San Fancisco, CA"
//   },
//   {
//     DATE: "Tue Jul 18 2019",
//     VENUE: "Pier 3 East",
//     LOCATION: "San Fancisco, CA"
//   },
//   {
//     DATE: "Fri Jul 22 2019",
//     VENUE: "View Loungue",
//     LOCATION: "San Fancisco, CA"
//   },
//   {
//     DATE: "Sat Aug 12 2019",
//     VENUE: "Hyatt Agency",
//     LOCATION: "San Fancisco, CA"
//   },
//   {
//     DATE: "Fri Sep 05 2019",
//     VENUE: "Moscow Center",
//     LOCATION: "San Fancisco, CA"
//   },
//   {
//     DATE: "Wed Aug 11 2019",
//     VENUE: "Press Club",
//     LOCATION: "San Fancisco, CA"
//   }
// ];

let tourInfo = [];

axios
  .get("https://project-1-api.herokuapp.com/showdates?api_key=n")
  .then(res => {
    tourInfo = res.data;
    return tourInfo;
  })
  .then(tourInfo => {
    tableCreator(".shows-tours__table", tourInfo, "label", "label");
    tableCreator(".shows-tours__table", tourInfo, "content", "content");
  });

//Creating the table
//Two sections in the table are made: one with tours info in it and the other with 6 identical rows of labels
//The two sections will be styled in CSS so that one is located on top of the other, its rows appearing between the rows of the other
// tableCreator(".shows-tours__table", tourInfo, "label", "label");
// tableCreator(".shows-tours__table", tourInfo, "content", "content");
