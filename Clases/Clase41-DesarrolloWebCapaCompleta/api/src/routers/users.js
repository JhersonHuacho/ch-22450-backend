const express = require("express");
const { getAllUsers, getUserById, createUsers } = require("../controllers/userController");
const { Router } = express;
const router = new Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUsers);

module.exports = router;