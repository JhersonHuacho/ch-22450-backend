const fs = require("fs");



const archivoJSON = fs.readFileSync("../package.json", { encoding: "utf-8" });


const info = {
    contenidoStr: archivoJSON,
    contenidoObj: JSON.parse(archivoJSON),
    size: 30
}

console.log(archivoJSON);

fs.writeFileSync("./info.txt", JSON.stringify(info, null, 2), {encoding: "utf-8"});

console.log(info);

// fs.stat