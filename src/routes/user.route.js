const { Router } = require("express");
const routes = Router();
const userController = require('../controllers/user.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.post('/user/register', userController.register);
routes.get("/user", verifyUserToken, IsAdmin,  userController.getAll);
routes.post('/user/login', userController.login);
routes.get("/user/profile", verifyUserToken, userController.getUser);

module.exports = routes;