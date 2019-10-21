let data = axios
  .get("https://project-1-api.herokuapp.com/showdates?api_key=n")
  .then(a => {
    console.log(a.data);
  });
