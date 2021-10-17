const fs = require("fs");


let read = fs.promises.readFile("./testtres.txt", {encoding: "utf-8"});

read.then(res => {
    console.log(res);
}).catch(err => {
    console.log("error");
})



const save = async () => {
    
}