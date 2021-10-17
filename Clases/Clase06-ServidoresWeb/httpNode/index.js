const http = require("http");
const moment = require("moment");

let server = http.createServer((request, response) => {
  let start = moment().format("HH");
  console.log(start);
  console.log(request.url);

  if (request.url === "/") {
    response.end("Hola mundo desde /");
  }
  if (request.url === "/fechayhora") {
    response.end("Hola mundo desde /fechayhora " +  start);

    if (parseInt(start) >= 18) {
      response.end("buenas noches");
    } else {
      response.end("buenas días o buenas tardes");
    }
  }
  
  if (request.url === "/api") {
    response.end("Hola mundo desde /api");
  }

});

server.listen(3002, () => {
  console.log("Server run on port 3002");
});