const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { ConnectAppInstance } = require("twilio/lib/rest/api/v2010/account/connectApp")
const { message } = require("../lib/twillio")

const { userSchema } = require("../models");

module.exports = () => {
  const login = async (req, res) => {

    try {
      const { email, password } = req.body

      if (!(email && password)) {
        res.status(400).send({ message: "All Input is required" })
      }

      else{
        const user = await userSchema.findOne({ where: { email } })

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ id: user.id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "2h" })
          res.user = user;

          res.status(200).send({ user, token})
        } else {

          res.status(401).send({ message: "Invalid Credentials" })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const signup = async (req, res) => {
    try {

      const { name, email, password, phone } = req.body
      if (!(email && password)) {
        res.status(400).json({ message: "All Input is required" })
      }
      else {
        const body = req.body
        if (req.file) {
          body.avatar = req.file.location
        }

        const user = await userSchema.findOne({  email })
        
        if (user) {
          res.status(400).send({ message: "Already same user exists!" });
        }
        else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10)

          let user = new userSchema({
            name: name,
            email: email,
            phone, phone,
            password: hashedPassword,
          });
          await user.save();

          const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: "2h" })

          res.status(200).json({ token })
        }
      }

    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Something went wrong", err })
    }
  }

  return { signup, login }
}
