const https = require("https");

const url = "https://jsonplaceholder.typicode.com/todos";

const options = {
    hostname: "jsonplaceholder.typicode.com",
    port: 443, // 443 => para https
    //port: 80, // 80 => para https
    path: "/todos/1",
    method: "GET"
}

const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
        data = data + chunk.toString();
    });

    response.on("end", () => {
        let body = JSON.parse(data);
        console.log(body);
    })
});

request.on("error", (err) => {
    console.log("Un error: ", err);
});

request.end();