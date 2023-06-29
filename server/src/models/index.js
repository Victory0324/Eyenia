const userSchema = require('./users');
const vehicleSchema = require('./vehicles');
const teltonikaSchema = require('./teltonika');
const notificationsSchema = require('./notifications');
//admin
const adminSchema = require('./admin');

module.exports =  { 
    adminSchema,
    userSchema,
    vehicleSchema,
    teltonikaSchema,
    notificationsSchema
};