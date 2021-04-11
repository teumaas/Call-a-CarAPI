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
      const rides = await Ride.find({}).populate({
        path: "car",
        model: "Car",
        select: {},
      });
      res.status(200).json({ rides }).end();
    } catch {
      res.status(422).json({ RidesError: "Can't get rides." }).end();
    }
  },

  async getRidesByUserId(req, res, next) {
    try {
      const rides = await Ride.find({ person: req.params.id }).populate({
        path: "car",
        model: "Car",
        select: {},
      });
      res.status(200).json({ rides }).end();
    } catch {
      res.status(422).json({ RidesError: "Can't get rides." }).end();
    }
  },

  async getRidesById(req, res, next) {
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
    const {
      car,
      dateTime,
      pickupAddress,
      pickupZipcode,
      destinationAddress,
      destinationZipcode,
    } = req.body;

    try {
      const ride = await Ride.create({
        car,
        person,
        dateTime,
        pickupAddress,
        pickupZipcode,
        destinationAddress,
        destinationZipcode,
      });

      res.status(200).json({ ride }).end();
    } catch (err) {
      res.status(400).json({ RidesError: err.body }).end();
      console.log(err);
    }
  },

  async putRideByID(req, res, next) {
    const params = {
      status: req.body.status,
      distanceInKm: req.body.distanceInKm,
      isLocked: req.body.isLocked
    };

    try {
      for (let prop in params) if (!params[prop]) delete params[prop];

      await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { params }
      );
      const result = await Ride.findOne({ _id: req.params.id });
      res.status(200).json({ result }).end();
    } catch {
      res.status(422).json({ RidesError: "Can't update status." }).end();
    }
  },

  async putRide(req, res, next) {
    const params = {
      status: req.body.status,
      distanceInKm: req.body.distanceInKm,
      isLocked: req.body.isLocked
    };

    try {
      for (let prop in params) if (!params[prop]) delete params[prop];

      await Ride.findOneAndUpdate(
        { _id: req.params.id },
        { params }
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

  async setLock(req, res, next) {
    const { isLocked } = req.body;
    try {
      await Ride.findOneAndUpdate({ _id: req.params.id }, { isLocked });
      const result = await Ride.findOne({ _id: req.params.id });
      res.status(200).json({ result }).end();
    } catch {
      res.status(422).json({ RidesError: "Can't set lock state." }).end();
    }
  },
};
