const express = require("express");
const app = express();
const multer = require("multer");

// Configurar multer
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        cb(null, "_coder_" + file.originalname);
    }
});

let update = multer({ storage }); // Devuelve un middleware

// app.post("/", (req, res) => {
//     console.log("Hello world");
//     res.send("Hello world");
// })

app.post("/", update.single("myfile") , (req, res) => {
    console.log(req.file);
    res.send("Archivo guardado");
})

app.listen(4002, () => {
    console.log("Server is run on port 4002");
});