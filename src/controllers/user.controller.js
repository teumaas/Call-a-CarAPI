const ApiError = require("../models/error.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async register(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      zipCode,
      shareData,
      password,
      payByFingerprintToken,
    } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        zipCode,
        shareData,
        password,
        payByFingerprintToken
      }).catch(next);

      res
        .status(200)
        .json({ message: "User is successfully registered." })
        .end();
    } else {
      res
        .status(422)
        .json({ RegisterError: "User is already registered." })
        .end();
    }
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    }).catch();

    if (!user) {
      res
        .status(422)
        .json({ LoginError: "Invalid email and/or password." })
        .end();
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token_type = "Bearer";
      const expires_in = process.env.TOKEN_EXPIRE;
      const access_token = jwt.sign({ user }, process.env.TOKEN_KEY, {
        expiresIn: expires_in,
      });

      res
        .status(200)
        .json({ token_type: token_type, expires_in: expires_in, access_token })
        .end();
    } else {
      res
        .status(422)
        .json({ LoginError: "Invalid email and/or password." })
        .end();
    }
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getAll(req, res, next) {
    const usersNotShared = await User.find(
      { shareData: { $eq: false } },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        roles: 1,
        shareData: 1,
        payByFingerprintToken: 1,
      }
    );
    const usersShared = await User.find(
      { shareData: { $eq: true } },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        address: 1,
        zipCode: 1,
        roles: 1,
        shareData: 1,
        payByFingerprintToken: 1,
      }
    );
    res.status(200).json({ usersNotShared, usersShared }).end();
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getUser(req, res, next) {
    const user = await User.find(
      { _id: req.user.user._id },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        address: 1,
        zipCode: 1,
        roles: 1,
        shareData: 1,
        payByFingerprintToken: 1,
      }
    );
    res.status(200).json({ user }).end();
  },

  async updatePayment(req, res, next) {
    try {
      await User.findOneAndUpdate(
        { _id: req.user.user._id },
        { payByFingerprintToken: true }
      );

      const user = await User.find(
        { _id: req.user.user._id },
        {
          firstName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          address: 1,
          zipCode: 1,
          roles: 1,
          shareData: 1,
          payByFingerprintToken: 1,
        }
      );
      res.status(200).json({ user }).end();
    } catch {
      res.status(422).json({ UpdatePayment: "Can't set token." }).end();
    }
  },

  async updateUser(req, res, next) {
    const params = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      zipCode: req.body.zipCode,
      shareData: req.body.shareData,
      payByFingerprintToken: req.body.payByFingerprintToken,
    };
    
    try {
      for (let prop in params) if (!params[prop]) delete params[prop];

      await User.findOneAndUpdate({ _id: req.user.user._id }, params);

      const user = await User.find(
        { _id: req.user.user._id },
        {
          firstName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          address: 1,
          zipCode: 1,
          roles: 1,
          shareData: 1,
          payByFingerprintToken: 1,
        }
      );
      res.status(200).json({ user }).end();
    } catch {
      res.status(422).json({ UpdateUser: "Can't update user." }).end();
    }
  },
};
