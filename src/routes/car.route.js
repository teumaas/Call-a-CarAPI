const { Router } = require("express");
const routes = Router();
const carController = require('../controllers/car.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/cars/types", verifyUserToken, carController.getCarTypes);
routes.get("/cars", verifyUserToken, carController.getCars);

routes.get("/cars/:id", verifyUserToken, IsAdmin, carController.getCarByID);
routes.put("/cars/:id", verifyUserToken, IsAdmin, carController.putCarByID);

routes.get("/cars/type/:id", verifyUserToken, IsAdmin, carController.getCarTypeByID);
routes.put("/cars/type/:id", verifyUserToken, IsAdmin, carController.putCarTypeByID);



module.exports = routes;