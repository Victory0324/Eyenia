const express = require("express");
const router = express.Router();

module.exports = () => {
  const auth = require("../controllers/users")
  const { signup, login } = auth()

  router.post("/login", login)
  router.post("/signup", signup)

  return router
}
