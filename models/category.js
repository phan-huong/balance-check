"use strict";

const mongoose = require("mongoose"),
      { Schema } = require("mongoose"),
      categorySchema = new Schema({
        category: {
          type: String,
          required: true
        },
        nominal: {
          type: Number,
          default: 0,
          min: [0, "negative value is prohibited"]
        },
        description: {
          type: String,
          required: true
        }
      },
      {
        timestamps: true
      }
    );

// Adding instance methods
categorySchema.methods.getInfo = function() {
  return `Category: ${this.category} Nominal: ${this.nominal} Description: ${this.description}`;
};

// require model by importing this module in another file
module.exports = mongoose.model("Category", categorySchema);
