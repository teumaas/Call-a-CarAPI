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
      res.status(422).json({ RidesError: "Can't get rides." }).end();
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

      res.status(200).json({ ride }).end();
    } catch {
      res.status(422).json({ RidesError: "Error while planning ride." }).end();
    }
  },

  async putRide(req, res, next) {
    try {
      await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.body.status }
      );
      const result = await Ride.findOne({ _id: req.params.id });
      res.status(200).json({ result }).end();
    } catch {
      res.status(422).json({ RidesError: "Can't update status." }).end();
    }
  },

  async payRideById(req, res, next) {
    try {
      await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { paymentFulfilled: true }
      );
      const result = await Ride.findOne({ _id: req.params.id });
      res.status(200).json({ result }).end();
    } catch {
      res.status(422).json({ RidesError: "Can't complete payment." }).end();
    }
  },

  async cancelRide(req, res, next) {
    try {
      await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { status: "Canceled" }
      );
      const result = await Ride.findOne({ _id: req.params.id });
      res.status(200).json({ result }).end();
    } catch {
      res.status(422).json({ RidesError: "Can't cancel status." }).end();
    }
  },
};
