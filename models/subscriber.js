"use strict";

const mongoose = require("mongoose"),
      { Schema } = require("mongoose"),
      subscriberSchema = new Schema({
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          lowercase: true,
          unique: true
        },
        zipCode: {
          type: Number,
          min: [10000, "Zip code too short"],
          max: 99999
        },
        courses: [{
          type: Schema.Types.ObjectId,
          ref: "Course"
        }]
      },
      {
        timestamps: true
      }
    );

// Adding instance methods
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

// require model by importing this module in another file
module.exports = mongoose.model("Subscriber", subscriberSchema);
