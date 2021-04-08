const ApiError = require("../models/error.model");
const Car = require("../models/car.model");
const CarType = require("../models/car.type.model");

module.exports = {
  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getCars(req, res, next) {
    try {
      const cars = await Car.find().populate({
        path: "car",
        model: "Car",
        select: { _id: 1, typeName: 1, pricePerKm: 1 },
      });
      await res.status(200).json({ cars }).end();
    } catch {
      res.status(422).json({ CarsError: "Can't get cars." }).end();
    }
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getCartypes(req, res, next) {
    try {
      const carTypes = await CarType.find();
      await res.status(200).json({ carTypes }).end();
    } catch {
      res.status(422).json({ CarsError: "Can't get cartypes." }).end();
    }
  },
};
