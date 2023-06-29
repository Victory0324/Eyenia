
module.exports = (router) => {
  const notifications = require("../controllers/notifications")
  const { show, create } = notifications()

  router.post("/create", create)//add notification
  router.post("/show", show)    //show notification list

  return router
}