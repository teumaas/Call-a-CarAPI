const { Router } = require("express");
const routes = Router();
const userController = require('../controllers/user.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/users/:id", verifyUserToken, IsAdmin,  userController.getUserByID);
routes.post('/users/register', userController.register);
routes.post('/users/login', userController.login);
routes.get("/users/specific", verifyUserToken, userController.getUser);
routes.put("/users/token", verifyUserToken, userController.updatePayment);
routes.put("/users/update", verifyUserToken, userController.updateUser);
routes.get("/users", verifyUserToken, IsAdmin,  userController.getAll);

module.exports = routes;