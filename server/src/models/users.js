const mongoose = require("mongoose")

const schema =new mongoose.Schema({
	email: {type:String, require:true, unique:true},
	password: {type:String, require:true},
	name:{type:String},
	phone:{type:String}
}, { timestamps: true })

module.exports = mongoose.model("Users", schema)