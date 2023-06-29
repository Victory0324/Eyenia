const { vehicleSchema } = require("../models");

const net = require('net');
const crypto = require('crypto');

function sendGprsCommand(ipAddress, portNumber, commandId, data) {
  // Create a new TCP socket connection
  const socket = net.createConnection(portNumber, ipAddress);

  // Generate the packet data
  const header = Buffer.from([0x01, 0x00, 0x00, 0x00]); // Header for FMB120 devices
  const length = Buffer.alloc(4); // Placeholder for data length
  const id = Buffer.from([commandId >> 8, commandId & 0xff]); // Convert command ID to 2-byte integer
  const payload = Buffer.from(data);
  const checksum = crypto
    .createHash('crc32')
    .update(header)
    .update(length)
    .update(id)
    .update(payload)
    .digest();
  const packet = Buffer.concat([header, length, id, payload, checksum]);

  // Set the correct data length in the packet
  packet.writeUInt32BE(packet.length - 8, 4);

  // Send the packet to the device
  socket.write(packet);

  // Wait for the device to acknowledge the packet
  socket.once('data', (ack) => {
    // Process the acknowledgement response as needed
    console.log(`Received acknowledgement: ${ack.toString('hex')}`);

    // Close the socket connection
    socket.end();
  });
}

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

      const vehicle = await vehicleSchema.findOne({ where: { deviceImei:deviceImei } })
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

  const maps = async (req, res) => {
    try {
      console.log(req.body)
      const currentDate = new Date();
      Vehicle.findOne({userid: '123', imei: {$in: Teltonikas.distinct("imei")} }).sort({transferdate: -1}).limit(1).exec(function(err, record){
          if(err){
              console.log(err);
              return;
          }
          console.log(record);
      });
      vehicleSchema.aggregate([
        { $match: { userId: req.body.userId, expirateDate : {$gte:new Date()}} },
        {
          $lookup: {
            from: 'teltonikas', // name of the Teltonika collection
            localField: 'deviceImei',
            foreignField: 'deviceImei',
            as: 'teltonikas'
          }
        },
        {
          $unwind: '$teltonikas'
        },
        {
          $sort: {
            'teltonikas.transferDate': -1
          }
        },
      ], function (err, results) {
        if (err) {
          res.status(400).json({ message: err })
        } else {
          res.status(200).json({ vehicles: results })
        }
      });

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  const showVehicleList = async (req, res) => {
    try {

      vehicleSchema.aggregate([
        { $match: { userId: req.body.userId } },
        {
          $lookup: {
            from: 'teltonikas', // name of the Teltonika collection
            localField: 'deviceImei',
            foreignField: 'deviceImei',
            as: 'teltonikas'
          }
        },
        {
          $unwind: '$teltonikas'
        },
        {
          $sort: {
            'teltonikas.transferDate': -1
          }
        },
        // {
        //   $group: {
        //     _id: '$deviceImei',
        //     vehicle: { $first: '$$ROOT' },
        //     latestTransferDate: { $first: '$teltonika.transferDate' }
        //   }
        // },
      ], function (err, results) {
        if (err) {
          res.status(400).json({ message: err })
        } else {
          res.status(200).json({ vehicles: results })
        }
      });

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  const updateVehicle = async (req, res) => {
    const {deviceImei,isVibration, isMovement, isStop, 
      isEnterZone, isSortZone, isOverspeed, isDetachment} = req.body

      vehicleSchema.updateOne(
        {deviceImei : deviceImei},
        {$set :{
          isVibration : isVibration,
          isMovement : isMovement,
          isStop : isStop,
          isEnterZone: isEnterZone,
          isSortZone:isSortZone,
          isOverspeed : isOverspeed,
          isDetachment:isDetacahment
        }},
        (err, result) => {
          if(err){
            res.status(401).json({ message: "Something went wrong" })
          }
          else{
            res.status(200).json({ message: "Vehicle updated successfully", result})            
          }
        }
      )
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

  const sendIgnitionCommand = async (req, res) => {
    const { ip, port, value } = req.body
    try {
      if(value == 0)
        sendGprsCommand(ip, port, 0x8001, Buffer.from([0x01]));
      else
        sendGprsCommand(ip, port, 0x8001, Buffer.from([0x00]));
      
      res.status(200).json({ message: "Ignition command sent" })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  const sendRestartCommand = async (req, res) => {
    const { ip, port } = req.body
    try {
      sendGprsCommand(ip, port, 0x7001, Buffer.from([0x01]));
      
      res.status(200).json({ message: "Restart command sent" })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  const sendResetCommand = async (req, res) => {
    const { ip, port } = req.body
    try {
      const RESET_COMMAND = 'AT^RESET\r\n';

      // Create a TCP socket connection
      const socket = new net.Socket();

      socket.connect(port, ip, () => {
        console.log(`Connected to ${ip}:${port}`);
        
        // Send reset command over the socket
        socket.write(RESET_COMMAND);
      });

      // Handle data received from the device
      socket.on('data', (data) => {
        console.log(`Received data: ${data}`);
      });
      
      res.status(200).json({ message: "Restart command sent" })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  return { createVehicle, maps, showVehicleList, updateVehicle, removeVehicle, 
  sendIgnitionCommand,sendResetCommand,sendRestartCommand }
}