let array = [7, 3, 9, 0, 1, 4, 6, 7, 3, 5, 3, 7, 0];

function distinct(array) {
  let obj = {};
  for (value of array) {
    obj[value] = (obj[value] || 0) + 1;
  }
  return Object.keys(obj).filter(key => obj[key] === 1);
}
console.log(distinct(array));
