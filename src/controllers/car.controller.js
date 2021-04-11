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
      res.status(422).json({ CarError: "Can't get cars." }).end();
    }
  },

  async getCarByID(req, res, next) {
    try {
      const car = await Car.findById( req.params.id );
      await res.status(200).json({ car }).end();
    } catch {
      res.status(422).json({ CarError: "Can't get car." }).end();
    }
  },

  async putCarByID(req, res, next) {
    const params = {
      model: req.body.model,
      brand: req.body.brand,
      type: req.body.type,
      entryDate: req.body.entryDate
    };

    try {
      for (let prop in params) if (!params[prop]) delete params[prop];

      await Car.findOneAndUpdate(
        { _id: req.params.id },
        { params }
      );
      const result = await Car.findOne({ _id: req.params.id });
      res.status(200).json({ result }).end();
    } catch {
      res.status(422).json({ CarError: "Can't update car." }).end();
    }
  },


  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getCarTypes(req, res, next) {
    try {
      const carTypes = await CarType.find();
      await res.status(200).json({ carTypes }).end();
    } catch {
      res.status(422).json({ CarsError: "Can't get carTypes." }).end();
    }
  },


  async getCarTypeByID(req, res, next) {
    try {
      const carType = await CarType.findById( req.params.id );
      await res.status(200).json({ carType }).end();
    } catch {
      res.status(422).json({ CarError: "Can't get carType." }).end();
    }
  },

  async putCarTypeByID(req, res, next) {
    const params = {
      typeName: req.body.typeName,
      pricePerKm: req.body.pricePerKm,
    };

    try {
      for (let prop in params) if (!params[prop]) delete params[prop];

      await CarType.findOneAndUpdate(
        { _id: req.params.id },
        { params }
      );
      const result = await CarType.findOne({ _id: req.params.id });
      res.status(200).json({ result }).end();
    } catch {
      res.status(422).json({ CarError: "Can't update car." }).end();
    }
  },
};
