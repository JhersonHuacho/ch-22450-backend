/*
Realizar un programa que:
A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
B) Lea nuestro propio archivo de programa y lo muestre por consola.
C) Incluya el manejo de errores con try catch (progresando las excepciones con throw new Error).

Aclaración: utilizar las funciones sincrónicas de lectura y escritura de archivos del módulo fs de node.js

*/
const fs = require("fs");

const fechaYhora = new Date();

try {
    // Escribir
    fs.writeFileSync("./fyh.txt", JSON.stringify(fechaYhora), { encoding: "utf-8" });
} catch (err) {
    throw new  Error("Error al crear el archivo:")    
} finally {
    console.log("Finally");
}
// Leer archivo
let readFileOne = fs.readFileSync("./fyh.txt", { encoding: "utf-8" });
console.log(readFileOne);

