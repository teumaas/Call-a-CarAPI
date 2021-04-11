const { Router } = require("express");
const routes = Router();
const incidentController = require('../controllers/incident.controller');
const { IsAdmin, verifyUserToken } = require("../middlewares/auth.middleware");

routes.get("/incidents", verifyUserToken, IsAdmin, incidentController.getIncidents);
routes.get("/incidents/:id", verifyUserToken, IsAdmin, incidentController.getIncidentsByID);
routes.post("/incidents", verifyUserToken, IsAdmin, incidentController.postIncident);

module.exports = routes;