const jwt = require("jsonwebtoken");
const ApiError = require("../models/error.model");

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return next(new ApiError("TokenError", "No valid token present.", 422))

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return next(new ApiError("TokenError", "No valid token present.", 422))

    let verifiedUser = jwt.verify(token, process.env.TOKEN_KEY); // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return next(new ApiError("AuthorizationError", "Unauthorized action is performed.", 422))

    req.user = verifiedUser; // user_id & user_type_id
    next();
  } catch (error) {
    next(new ApiError("TokenError", "No valid token present.", 422))
  }
};

exports.IsUser = async (req, res, next) => {
  if (req.user.user.roles == 'user') {
    next();
  } else {
    return next(new ApiError("AuthorizationError", "Unauthorized to perform action.", 422));
  }  
};

exports.IsAdmin = async (req, res, next) => {
  if (req.user.user.roles == 'admin') {
    next();
  } else {
    return next(new ApiError("AuthorizationError", "Unauthorized to perform action.", 422));
  }
};
