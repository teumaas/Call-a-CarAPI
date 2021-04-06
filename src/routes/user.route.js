const { Router } = require("express");
const routes = Router();
const { withJWTAuthMiddleware } = require("express-kun");
const userController = require('../controllers/user.controller');
const { authJwt } = require("../middlewares/auth.middleware");

const protectedRouter = withJWTAuthMiddleware(routes, process.env.TOKEN_KEY);

routes.post('/auth/register', userController.register);
protectedRouter.get("/users",  userController.getAll);
routes.post('/auth/login', userController.login);
protectedRouter.get("/users/:id", userController.getUser);

module.exports = routes;