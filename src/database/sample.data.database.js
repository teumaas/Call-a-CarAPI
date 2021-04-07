const mongoose = require("mongoose");

const Car = require("../models/car.model");
const CarType = require("../models/car.type.model");

module.exports = {
  // Load Car Types
  async loadCarTypes() {
    await CarType.create({
      _id: new mongoose.Types.ObjectId("606d9955bcf0243c7a022a87"),
      typeName: "Regular",
      pricePerKm: 2.5,
    })

    await CarType.create({
      _id: new mongoose.Types.ObjectId("606d9b46a32e43fb0a7bb49e"),
      typeName: "Bus",
      pricePerKm: 3.5,
    })
  },

  // Load Car Types
  async loadCar() {
    await Car.create({
      _id: new mongoose.Types.ObjectId("606da350c579dbffc3c2725b"),
      model: "Corolla",
      brand: "Toyota",
      //Type 1
      type: new mongoose.Types.ObjectId("606d9955bcf0243c7a022a87"),
      entryDate: "2021",
    })

    await Car.create({
      _id: new mongoose.Types.ObjectId("606d9d888b488ffb4541fab2"),
      model: "Mustang",
      brand: "Ford",
      //Type 1
      type: new mongoose.Types.ObjectId("606d9955bcf0243c7a022a87"),
      entryDate: "2021",
    })

    await Car.create({
      _id: new mongoose.Types.ObjectId("606da13a734fe3a0885e0023"),
      model: "Caddy",
      brand: "Volkswagen",
      //Type 2
      type: new mongoose.Types.ObjectId("606d9b46a32e43fb0a7bb49e"),
      entryDate: "2021",
    })
  },
};
