const express = require("express");
const router = express.Router();

module.exports = () => {
  const payment = require("../controllers/payment")
  const { chargeMembership } = payment()

  router.post("/charge", chargeMembership)

  return router
}