const ApiError = require("../models/error.model");
const User = require("../models/user.schema");
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
      }).catch(next);

      res
        .status(200)
        .json({ message: "User is successfully registerd." })
        .end();
    } else {
      next(new ApiError("RegisterError", "User is already registered.", 422));
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
      next(new ApiError("LoginError", "Invalid email and/or password.", 404));
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
      next(new ApiError("LoginError", "Invalid email and/or password.", 404));
    }
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getAll(req, res, next) {
    const usersNotShared = await User.find({shareData: { $eq: false }}, {firstName: 1, lastName: 1, email: 1, roles: 1, shareData: 1})
    const usersShared = await User.find({shareData: { $eq: true }}, {firstName: 1, lastName: 1, email: 1, phoneNumber :1, address: 1, zipCode: 1, roles: 1, shareData: 1})
    res.status(200).json({ usersNotShared, usersShared}).end();
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getUser(req, res, next) {
    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      res.status(200).json({ user }).end();
    } else if (
      (await !mongoose.Types.ObjectId.isValid(req.params.id)) ||
      !user
    ) {
      next(new ApiError("FindUserError", "User not found.", 404));
    }
  },
};
