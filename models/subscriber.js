const mongoose = require("mongoose"),

//define schema properties
 subscriberSchema = mongoose.Schema({
   name: String,
   email: String,
   zipCode: Number
 });

//export model so that other modules can access it
module.exports = mongoose.model("Subscriber", subscriberSchema);
