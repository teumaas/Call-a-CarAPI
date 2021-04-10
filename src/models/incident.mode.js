const mongoose = require("mongoose");

const IncidentSchema = mongoose.Schema(
  {
    ride: {
      type: mongoose.Types.ObjectId,
      ref: "ride",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amountOfPassengers: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Incident", IncidentSchema);
