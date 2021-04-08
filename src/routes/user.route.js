const { Router } = require("express");
const routes = Router();
const userController = require('../controllers/user.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.post('/users/register', userController.register);
routes.get("/users", verifyUserToken, IsAdmin,  userController.getAll);
routes.post('/users/login', userController.login);
routes.get("/users/specific", verifyUserToken, userController.getUser);
routes.put("/users/token", verifyUserToken, userController.updatePayment);
routes.put("/users/update", verifyUserToken, userController.updateUser);


module.exports = routes;