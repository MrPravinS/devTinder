const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 4,
      maxLength: 8,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 65,
    },
    gender: {
      type: String,
      validate(value) {
        // only validate for new user not existing user
        if (!["male", "female", "others"].includes(value)) {
          throw new Error();
        }
      },
    },
    photoUrl: {
      type: String,
    },

    about: {
      type: String,
      default: "This is default ",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
