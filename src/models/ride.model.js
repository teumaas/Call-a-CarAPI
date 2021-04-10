const mongoose = require("mongoose");

const RideSchema = mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "car",
      required: true,
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "person",
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    distanceInKm: {
      type: Number,
      default: 0.0,
    },
    status: {
      type: [
        {
          type: String,
          enum: [
            "Pending",
            "Driving to customer",
            "Transporting customer",
            "Complete",
            "Canceled"
          ],
        },
      ],
      default: ["Pending"],
    },
    paymentFulfilled: {
      type: Boolean,
      default: false,
    },
    pickupAddress: {
      type: String,
      default: true,
    },
    pickupZipcode: {
      type: String,
      default: true,
    },
    destinationAddress: {
      type: String,
      default: true,
    },
    destinationZipcode: {
      type: String,
      default: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Ride", RideSchema);
