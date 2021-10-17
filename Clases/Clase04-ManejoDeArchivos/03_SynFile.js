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

// Leer archivo
let readFileOne = fs.readFileSync("./test.txt", { encoding: "utf-8" });
console.log(readFileOne);
// Escribir
fs.writeFileSync("./test2.txt", "Contenido Nuevo", { encoding: "utf-8" });
// Añadir
fs.appendFileSync("./test.txt", "Contenido Adicional", { encoding: "utf-8" });
// Eliminar
try {
    fs.unlinkSync("./test3.txt");
} catch (err) {
    console.log("Error encontrado al Eliminar: " + err);
} finally {
    
}

/**
 * 
 */
 fs.writeFileSync("./test2.json", JSON.stringify(arr, null, 2), { encoding: "utf-8" });

