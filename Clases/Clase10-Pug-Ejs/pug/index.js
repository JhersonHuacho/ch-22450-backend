const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("");
})

app.listen(8080, () => {
    console.log("Server runing!");
});