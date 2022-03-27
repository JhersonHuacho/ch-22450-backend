fetch("http://localhost:8080/api/users")
  .then(data => data.json())
  .then(dataJson => console.log(dataJson))