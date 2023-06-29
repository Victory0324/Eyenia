const mongoose = require("mongoose")

const schema =new mongoose.Schema({
	userId:{type:String},
	vehicleName: {type:String, require:true},
	deviceImei: {type:String, require:true, unique:true},
	deviceType: {type:String, require:true},
	deviceModel: {type:String, require:true},
	simNumber: {type:String, require:true},
	addClient: {type:String},
	expirateDate:{ type: Date, default: Date.now() },
	isVibration : {type:Boolean, default:false},
    isMovement : {type:Boolean, default:false},
    isStop : {type:Boolean, default:false},
    isEnterZone: {type:Boolean, default:false},
    isSortZone:{type:Boolean, default:false},
    isOverspeed : {type:Boolean, default:false},
    isDetachment:{type:Boolean, default:false}
}, { timestamps: true })

module.exports = mongoose.model("Vehicles", schema)