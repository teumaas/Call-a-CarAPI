const mongoose = require("mongoose");
const axios = require("axios");

const Car = require("../models/car.model");
const CarType = require("../models/car.type.model");
const User = require("../models/user.model");

module.exports = {
  // Load Car Types
  async loadCarTypes() {
    await CarType.create({
      _id: new mongoose.Types.ObjectId("606d9955bcf0243c7a022a87"),
      typeName: "Regular",
      pricePerKm: 2.5,
    });

    await CarType.create({
      _id: new mongoose.Types.ObjectId("606d9b46a32e43fb0a7bb49e"),
      typeName: "Bus",
      pricePerKm: 3.5,
    });
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
    });

    await Car.create({
      _id: new mongoose.Types.ObjectId("606d9d888b488ffb4541fab2"),
      model: "Mustang",
      brand: "Ford",
      //Type 1
      type: new mongoose.Types.ObjectId("606d9955bcf0243c7a022a87"),
      entryDate: "2021",
    });

    await Car.create({
      _id: new mongoose.Types.ObjectId("606da13a734fe3a0885e0023"),
      model: "Caddy",
      brand: "Volkswagen",
      //Type 2
      type: new mongoose.Types.ObjectId("606d9b46a32e43fb0a7bb49e"),
      entryDate: "2021",
    });
  },

  // Load Car Types
  async createUser(email, password, role) {
    await User.create({
      _id: new mongoose.Types.ObjectId(),
      shareData: true,
      roles: [role],
      payByFingerprintToken: true,
      firstName: "John",
      lastName: "Doe",
      email: email,
      phoneNumber: "+31 6 12345678",
      address: "Jansteenlaan 11",
      zipCode: "1234AB",
      password: password,
    });
  },

  async loginUser(email, password, url) {
    try {
      const post = await axios.post(url, {
        email: email,
        password: password,
      });
      console.log(post.data);
      return post.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  },

};
