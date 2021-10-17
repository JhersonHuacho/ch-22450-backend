const fs = require("fs");

const arr = [
    {
        producto: "Cable",
        price: 200
    },
    {
        producto: "Celular",
        price: 500
    },
    {
        producto: "Cargador",
        price: 300
    }
]

fs.readFile("./test.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) {
        throw "Error al leer";
    }
    console.log(data);
});

fs.writeFile("./test2.txt", "Contenido del archivo AsyncFile", { encoding: "utf-8"}, (err) => {
    if (err) {
        throw "Error al escribir";
    }
    console.log("Se escribio el archivo correctamente");
});

fs.appendFile("./test.txt", "\n Contenido adicional de AsyncFile.js", { encoding: "utf-8" }, (err) => {
    if (err) {
        throw "Error al añadir contenido el archivo";
    }
    console.log("Se añadio contenido al archivo correctamente");
});

// fs.unlink("./test2.txt", (err) => {
//     if (err) {
//         throw "Error al escribir";
//     }
// })

fs.writeFile("./test3.txt", JSON.stringify(arr, null, 2), { encoding: "utf-8"}, (err) => {
    if (err) {
        throw "Error al escribir";
    }
    console.log("Se escribio el archivo correctamente");
});

console.log("FIN");