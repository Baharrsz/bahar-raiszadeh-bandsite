function uppercase(string) {
  var str = "";
  str = str.concat(string[0].toUpperCase());

  for (let i = 1; i < string.length; i++) {
    if (string[i] != " ") {
      str = str.concat(string[i]);
    } else {
      str = str.concat(" ");
      str = str.concat(string[i + 1].toUpperCase());
      i++;
    }
  }
  return str;
}

console.log(uppercase("this is a test"));
