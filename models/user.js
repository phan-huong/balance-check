"use strict";

const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      randToken = require("rand-token"),
      {Schema} = require("mongoose"),
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
          max: 99999,
          required: true
        },
        apiToken: {
          type: String
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

// adding passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

// creating a pre("save") hook to generate an API token
userSchema.pre("save", function(next) {
  let user = this;
  if (!user.apiToken) user.apiToken = randToken.generate(16);
  next();
});

module.exports = mongoose.model("User", userSchema);
