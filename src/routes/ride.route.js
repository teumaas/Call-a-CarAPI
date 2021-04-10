const { Router } = require("express");
const routes = Router();
const rideController = require('../controllers/ride.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/rides", verifyUserToken, rideController.getRidesById);
routes.get("/allRides", verifyUserToken, IsAdmin, rideController.getRidesById);
routes.post("/rides", verifyUserToken, rideController.postRide);
routes.put("/rides/:id", verifyUserToken, IsAdmin, rideController.putRide);
routes.put("/rides/:id/pay", verifyUserToken, rideController.payRideById);
routes.put("/rides/:id/cancel", verifyUserToken, rideController.cancelRide);
routes.put("/rides/:id/setLock", verifyUserToken, rideController.setLock);

module.exports = routes;