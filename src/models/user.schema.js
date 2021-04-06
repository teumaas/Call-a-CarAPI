const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function setPassword(value) {
  return bcrypt.hashSync(value, 10);
}

const UserSchema = mongoose.Schema(
  {
    // Public data
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    shareData: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [
        {
          type: String,
          enum: ["user", "admin"],
        },
      ],
      default: ["user"],
    },
    // End public data

    // Private data
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    // End private data

    password: {
      type: String,
      required: true,
      set: setPassword,
    },
    created: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
