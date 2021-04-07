const { Router } = require("express");
const routes = Router();
const userController = require('../controllers/user.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.post('/auth/register', userController.register);
routes.get("/users", verifyUserToken, IsAdmin,  userController.getAll);
routes.post('/auth/login', userController.login);
routes.get("/user", verifyUserToken, userController.getUser);

module.exports = routes;