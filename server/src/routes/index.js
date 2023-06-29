const express = require("express");
const router = express.Router();

module.exports = () => {
  // const router = require("express").Router();
  
  const vehiclesRoutes = require("./vehicles")(router)
  const teltonikaRoutes = require("./teltonika")(router)
  const paymentRoutes = require("./payment")(router)
  const notificationRoutes = require("./notifications")(router)

  router.use("/vehicles", vehiclesRoutes);
  router.use("/teltonika", teltonikaRoutes);
  router.use("/payment", paymentRoutes);
  router.use("/notifications", notificationRoutes);

  return router;
};
