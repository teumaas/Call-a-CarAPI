const { Router } = require("express");
const routes = Router();
const rideController = require('../controllers/ride.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/rides", verifyUserToken, rideController.getRides);
routes.post("/ride", verifyUserToken, rideController.postRide);
routes.put("/ride/:id", verifyUserToken, rideController.putRide);
routes.put("/ride/:id/pay", verifyUserToken, rideController.payRideById);

module.exports = routes;