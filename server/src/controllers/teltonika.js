const { teltonikaSchema } = require("../models");

module.exports = () => {

  const createTeltonika = async (req, res) => {
    
    try {
      const { deviceImei, lat, lng, movement, speed, fuel, battery, signal, address, transferDate } = req.body

      let data = new teltonikaSchema({
        deviceImei: deviceImei,
        lat: lat,
        lng: lng,
        transferDate: transferDate,
        movement: movement,
        speed: speed,
        fuel: fuel,
        battery: battery,
        signal: signal,
        address: address
      });
      await data.save(function (err, savedDocument) {
        if (err) {
          console.error("save error:", err);
        }else{
          res.status(200).json({ message:'teltonika data added' })
        }
      });
      
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong", err })
    }
  }

  // const getRecent = async (req, res) => {
  //   const userId = req.body.userId
  //   try {
  //     console.log("Teltonika--------", req.body)
  //     const vehicles = await client.vehicles.findMany({
  //       where: {
  //         userId: req.body.userId
  //       }
  //     })


  //     var result = [];
  //     for (var i = 0; i < vehicles.length; i++) {
  //       const filteredTeltonika = await client.teltonika.findMany({
  //         where: {
  //           imei: vehicles[i].imei
  //         },
  //         orderBy: {
  //           createdAt: 'desc'
  //         }
  //       })

  //       result.push(filteredTeltonika[0]);
  //     }
  //     res.status(200).send({ teltonika: result });

  //   } catch (err) {
  //     console.log(err)
  //     res.status(401).json({ message: "Something went wrong" })
  //   }
  // }

  return { createTeltonika }
};
