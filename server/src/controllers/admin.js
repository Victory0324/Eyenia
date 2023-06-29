const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { adminSchema } = require("../models");

module.exports = () => {
  const login = async (req, res) => {

    try {
      const { email, password } = req.body

      if (!(email && password)) {
        res.status(400).send({ message: "All Input is required" })
      }

      else{
        const user = await adminSchema.findOne({ where: { email } })

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ id: user.id.toString(), permissions:'admin' }, process.env.TOKEN_SECRET, { expiresIn: "2h" })
          res.user = user;

          res.status(200).send({ userId:user.id, token})
        } else {

          res.status(403).send('Invalid Credentials')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const signup = async (req, res) => {
    try {
      console.log("dfsd")
      const { username, email, password } = req.body
      if (!(username && email && password)) {
        console.log("6789")
        res.status(200).json({ message: "All Input is required" })
      }
      else {
        const body = req.body
        if (req.file) {
          body.avatar = req.file.location
        }

        const user = await adminSchema.findOne({  email })
        
        if (user) {
          console.log(user)
          res.status(200).send({ message: "Already same user exists!" });
        }
        else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10)

          let user = new adminSchema({
            username: username,
            email: email,
            password: hashedPassword,
          });
          await user.save();

          const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: "2h" })

          res.status(200).json({ token, message:"Signup success.", success: true })
        }
      }

    } catch (err) {
      res.status(401).json({ message: "Something went wrong", err })
    }
  }

  return { signup, login }
}
