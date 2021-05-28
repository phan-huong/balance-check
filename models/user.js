"use strict";

const mongoose = require("mongoose"),
      { Schema } = require("mongoose"),
      userSchema = new Schema({
        name: {
          first: {
            type: String,
            trim: true
          },
          last: {
            type: String,
            trim: true
          }
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
        password: {
          type: String,
          required: true
        },
        balance: {
          type: Schema.Types.ObjectId,
          ref: "Courses"
        },
        spendings: [
          {
            type: Schema.Types.ObjectId,
            ref: "Subscribers"
          }
        ]
      },
      {
        timestamps: true
      }
    );

// adding virtual attribute
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
})

module.exports = mongoose.model("User", userSchema);
