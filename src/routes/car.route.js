const { Router } = require("express");
const routes = Router();
const carController = require('../controllers/car.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/cars/types/:id", verifyUserToken, IsAdmin, carController.getCarTypeByID);
routes.put("/cars/types/:id", verifyUserToken, IsAdmin, carController.putCarTypeByID);
routes.get("/cars/types", verifyUserToken, carController.getCarTypes);

routes.get("/cars/:id", verifyUserToken, IsAdmin, carController.getCarByID);

/**
 * @swagger
 * /cars:
 *    put:
 *      description: Get all cars
 *      responses:
 *        200:
 *          description: Success
 */

routes.put("/cars/:id", verifyUserToken, IsAdmin, carController.putCarByID);

/**
 * @swagger
 * /cars:
 *    get:
 *      security:
 *          jwt: []
 *      description: Get all cars
 *      responses:
 *        200:
 *          description: Success
 */

routes.get("/cars", verifyUserToken, carController.getCars);

module.exports = routes;