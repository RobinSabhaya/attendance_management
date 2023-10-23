const express = require("express");

const route = express.Router();
const {
  postLogin,
  getOneLogin,
} = require("../../app/controllers/loginController");
route.get("/:id", getOneLogin);
route.post("/", postLogin);
module.exports = route;
