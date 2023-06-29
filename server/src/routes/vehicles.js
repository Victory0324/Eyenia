
module.exports = (router) => {
  const vehicles = require("../controllers/vehicles")
  const { createVehicle, maps, showVehicleList, updateVehicle, removeVehicle,sendIgnitionCommand, sendResetCommand, sendRestartCommand } = vehicles()

  router.post("/create", createVehicle)//add vehicle
  router.post("/maps", maps)    //get vehicle list to show on maps
  router.post("/show", showVehicleList)    //get vehicle list normal
  router.put("/update", updateVehicle)    //update vehicle
  router.delete("/remove", removeVehicle) //remove vehicle

  router.post("/ignition", sendIgnitionCommand)
  router.post("/reset", sendResetCommand)
  router.post("/restart", sendRestartCommand)
  return router
}