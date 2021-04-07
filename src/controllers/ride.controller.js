const ApiError = require("../models/error.model");
const Ride = require("../models/ride.model");

module.exports = {
  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getRides(req, res, next) {
    try {
      const rides = await Ride.find({ person: req.user.user._id }).populate({
        path: "car",
        model: "Car",
        select: {},
      });
      res.status(200).json({ rides }).end();
    } catch {
      next(new ApiError("RidesError", "Can't get rides.", 422));
    }
  },

  async postRide(req, res, next) {
    const person = req.user.user._id;
    const { car, dateTime } = req.body;

    try {
      const ride = await Ride.create({
        car,
        person,
        dateTime,
      });

      res.status(200).json({ ride  }).end();
    } catch {
      next(new ApiError("RideError", "Error while planning ride.", 422));
    }
  },

  async putRide(req, res, next) {
    try {
      const ride = await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.body.status }
      );
      await res.status(200).json({ ride }).end();
    } catch {
      next(new ApiError("RidesError", "Can't update status.", 422));
    }
  },

  async payRideById(req, res, next) {
    try {
      const ride = await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { paymentFulfilled: true }
      );
      await res.status(200).json({ ride }).end();
    } catch {
      next(new ApiError("RidesError", "Can't complete payment.", 422));
    }
  },

  async cancelRide(req, res, next) {
    try {
      const ride = await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { status: "Cancel" }
      );
      res.status(200).json({ ride }).end();
    } catch {
      next(new ApiError("RidesError", "Can't cancel status.", 422));
    }
  },
};
