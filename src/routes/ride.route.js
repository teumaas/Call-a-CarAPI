const { Router } = require("express");
const routes = Router();
const rideController = require('../controllers/ride.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/rides/all", verifyUserToken, IsAdmin, rideController.getRidesById);
routes.put("/rides/:id/pay", verifyUserToken, rideController.payRideById);
routes.put("/rides/:id/cancel", verifyUserToken, rideController.cancelRide);
routes.put("/rides/:id/setLock", verifyUserToken, rideController.setLock);
routes.get("/rides/:id/all", verifyUserToken, IsAdmin, rideController.getRidesByUserId);
routes.put("/rides/:id", verifyUserToken, rideController.putRide);
routes.get("/rides", verifyUserToken, rideController.getRidesById);
routes.post("/rides", verifyUserToken, rideController.postRide);

module.exports = routes;