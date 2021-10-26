const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();

app.set("views", "./views");
app.set("view engine", "hbs");

app.engine("hbs", expressHandlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs"
}));

app.get("/", (req, res) => {
    res.render("index.hbs");
});

app.listen(3000, () => {
    console.log("Server on port 3000");
});