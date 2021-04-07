const mongoose = require("mongoose");

const CarSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    type: {
        type: mongoose.Types.ObjectId,
        ref: 'type',
        required: true
    },
    entryDate: {
      type: String,
      required: true,
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Car", CarSchema);
