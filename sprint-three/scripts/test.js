function dateDifference(dateOne, dateTwo) {
  let result = "";
  let diff = (dateTwo - dateOne) / (24 * 3600 * 1000);
  let year = "";
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  if (Math.abs(diff) >= 11) {
    month = months[dateOne.getMonth()];
    if (dateOne.getFullYear() !== dateTwo.getFullYear()) {
      year = dateOne.getFullYear();
    }
    result = `${dateOne.getDate()} ${month} ${year}`;
  } else {
    if (diff < 1) {
      if (diff < 1 / (24 * 60)) {
        result = "just now";
      } else if (diff < 2 / (24 * 60)) {
        result = "1 minute ago";
      } else if (diff<1/24) {
        result = `${Math.floor(diff*60)} minutes ago`;
      } else {
          result = `${Math.floor(diff*60*24)} hours ago`;
      }
    } else if (dateOne.getDate())
  }
  return result;
}

let d1 = new Date();
let d2 = new Date(2018, 11, 24, 10, 33, 30, 0);
console.log(dateDifference(d2, d1));
