const mongoose = require("mongoose");

const CarTypeSchema = mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
    },
    pricePerKm: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("CarType", CarTypeSchema);
