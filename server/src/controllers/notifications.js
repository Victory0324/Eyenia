const { notificationSchema } = require("../models");

module.exports = () => {
  const create = async (req, res) => {
    try {
      const {
        userId,
        vehicel,
        alert,
        time } = req.body
      console.log(req.body);
      
      let notification = new notificationSchema({
        userId: userId,
        vehicle: vehicel,
        alert: alert,
        time: time
      });
      await notification.save();

      res.status(200).send({ message: "Notification added successfully" })

    } catch (err) {
      console.log(err)
      res.status(401).send({ message: "Something went wrong" })
    }
  }

  const show = async (req, res) => {
    try {
      const { userId } = req.body
      const notifications = await notificationSchema.findOne({ where: { userId } })
      res.status(200).json({ notifications })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong" })
    }
  }

  return { create, show }
}