const express = require('express');
const { userAll } = require('../services/userServices');
const router = express.Router();

router.get("/", (req, res) => {
  let users = userAll();
  res.send({ data: users });
});

module.exports = router;