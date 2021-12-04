const express = require("express");

const app = express();
const user = require("./db");

app.post("/", async (req, res) => {
    const userCreate = await user.create({
        name: "Francisco",
        email: "jhersonhuacho@gmail.com"
    });

    res.json({
        message: "Guardado",
        data: userCreate
    });
})

app.get("/", async (req, res) => {
    const users = await user.findAll();
    res.json({
        message: "OK",
        data: users
    });
})

app.listen(3001, () => {
    console.log("Server run on port 3001");
});