const ApiError = require("../models/error.model");
const Ride = require("../models/ride.model");
const Incident = require("../models/incident.model");

module.exports = {
  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  async getIncidents(req, res, next) {
    try {
      const incidents = await Incident.find({});
      res.status(200).json({ incidents }).end();
    } catch {
      res.status(422).json({ IncidentsError: "Can't get incidents." }).end();
    }
  },

  async getIncidentsByID(req, res, next) {
    try {
      const incidents = await Incident.find({ _id: req.params.id });
      res.status(200).json({ incidents }).end();
    } catch {
      res.status(422).json({ IncidentsError: "Can't get incidents." }).end();
    }
  },

  async postIncident(req, res, next) {
    const {
      ride,
      description,
      amountOfPassengers,
      date,
    } = req.body;

    try {
      const incident = await Incident.create({
        ride,
        description,
        amountOfPassengers,
        date
      });

      res.status(200).json({ incident }).end();
    } catch (err) {
      res.status(400).json({ IncidentsError: err.body }).end();
      console.log(err);
    }
  },
};
