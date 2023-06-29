const express = require("express");
const router = express.Router();

module.exports = () => {
  const admin = require("../controllers/admin")
  const vehicles = require("../controllers/vehicles")
  const { signup, login } = admin()
  const {showVehicleList} = vehicles()

  router.post("/login", login)
  router.post("/signup", signup)

  router.get("/devices", showVehicleList)
  return router
}
