const { Router } = require("express");
const routes = Router();
const carController = require('../controllers/car.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/cars", verifyUserToken, carController.getCars);
routes.get("/cars/types", verifyUserToken, carController.getCartypes);

module.exports = routes;