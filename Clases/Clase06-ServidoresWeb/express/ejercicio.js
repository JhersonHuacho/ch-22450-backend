const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

app.get("", () => {

});

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});