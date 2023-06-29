const { vehicleSchema } = require("../models");

module.exports = () => {
  const createVehicle = async (req, res) => {

    try {
      const {
        userId,
        vehicleName,
        deviceImei,
        deviceType,
        deviceModel,
        simNumber,
        addClient } = req.body
      console.log(req.body);

      const vehicle = await vehicleSchema.findOne({ where: { deviceImei } })
      if (vehicle) {
        res.status(400).send({ message: "Already same device exists!" });
      } else {
        let currentDate = new Date();
        let newDate = new Date();
        newDate.setDate(currentDate.getDate() + 2);
        let vehicle = new vehicleSchema({
          userId: userId,
          vehicleName: vehicleName,
          deviceImei: deviceImei,
          deviceType: deviceType,
          deviceModel: deviceModel,
          simNumber: simNumber,
          addClient: addClient,
          expirateDate: newDate,
        });
        await vehicle.save();

        res.status(200).send({ message: "Vehicle added successfully" })
      }

    } catch (err) {
      console.log(err)
      res.status(401).send({ message: "Something went wrong" })
    }
  }

  const showVehicleList = async (req, res) => {
    try {
      const results = vehicleSchema.find()
      res.status(200).json(results)
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  const updateVehicle = async (req, res) => {
    const body = req.body
    try {
      const updatedMessage = await client.vehicles.update({
        where: {
          userId: body.userId,
          deviceImei: body.deviceImei
        },
        data: {
          ...body
        }
      })

      res.status(200).json({ message: "Vehicle updated successfully", data: updatedMessage })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  const removeVehicle = async (req, res) => {
    const { deviceImei } = req.body
    try {
      const vehicle = await vehicleSchema.findOne({ where: { deviceImei: deviceImei } })
      if (!vehicle) {
        res.status(200).json({ message: "Vehicle not exist" })
      }
      else {
        await vehicleSchema.deleteMany({
          where: {
            deviceImei: deviceImei
          }
        })

        res.status(200).json({ message: "Vehicle deleted successfully" })
      }
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  return { createVehicle, maps, showVehicleList, updateVehicle, removeVehicle }
}