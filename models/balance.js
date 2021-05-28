"use strict";

const mongoose = require("mongoose"),
      { Schema } = require("mongoose"),
      balanceSchema = new Schema({
        date: {
          type: String,
          required: true,
        },
        balance: {
          type: Number,
          default: 0,
          min: [0, "negative value is prohibited"]
        }
      },
      {
        timestamps: true
      }
    );

// require model by importing this module in another file
module.exports = mongoose.model("Balance", balanceSchema);
