const jwt = require("jsonwebtoken");
const ApiError = require("../models/error.model");

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    res.status(422).json({ TokenError: "No valid token present." }).end();
  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res.status(422).json({ TokenError: "No valid token present." }).end();
      
    let verifiedUser = jwt.verify(token, process.env.TOKEN_KEY); // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(422).json({ AuthorizationError: "Unauthorized action is performed." }).end();
    
    req.user = verifiedUser; // user_id & user_type_id
    next();
  } catch (error) {
    res.status(422).json({ TokenError: "No valid token present." }).end();
  }
};

exports.IsUser = async (req, res, next) => {
  if (req.user.user.roles == 'user') {
    next();
  } else {
    return res.status(422).json({ AuthorizationError: "Unauthorized to perform action." }).end();
  }  
};

exports.IsAdmin = async (req, res, next) => {
  if (req.user.user.roles == 'admin') {
    next();
  } else {
    return res.status(422).json({ AuthorizationError: "Unauthorized to perform action." }).end();
  }
};
