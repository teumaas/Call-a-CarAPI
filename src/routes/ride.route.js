const { Router } = require("express");
const routes = Router();
const rideController = require('../controllers/ride.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/rides", verifyUserToken, rideController.getRides);
routes.post("/rides", verifyUserToken, rideController.postRide);
routes.put("/rides/:id", verifyUserToken, rideController.putRide);
routes.put("/rides/:id/pay", verifyUserToken, rideController.payRideById);

module.exports = routes;