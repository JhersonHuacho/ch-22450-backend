const express = require("express");
const routerUsers = require("./src/routers/users");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;



/*****************************************************/
/*                     MIDDLEWARE                    */
/*****************************************************/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routerUsers);


app.listen(PORT, () => {
  console.log("Server is run on Port: " + PORT);
})

module.exports = app;

