const router = require("express").Router();

module.exports = () => {
  const teltonika = require("../controllers/teltonika");
  const { createTeltonika } = teltonika();

  router.post("/create", createTeltonika);
  // router.post("/", getRecent);

  return router;
};
