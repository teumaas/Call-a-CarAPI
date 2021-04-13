//Requiring the correct env files by checking NODE_ENV
require("dotenv").config({ path: `${__dirname}/env/config.env` });

const express = require("express");
const morgan = require("morgan"); //HTTP request logger
const bodyParser = require("body-parser"); //Pase request body to JSON
const cors = require("cors"); // Access control
const mongoose = require("mongoose");
const ApiError = require("./models/error.model");
const schedule = require("node-schedule");
const axios = require("axios");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const sampleData = require("./database/sample.data.database");

const app = express();

const databaseString = `mongodb://${process.env.DB_HOST_PROD}/${process.env.DB_NAME_PROD}`;
const port = "4000";

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Call-a-Car",
      version: "1.0.0",
      description:
        "This is documentation for the Call-a-Car REST API built with Express+MongDB.",
    },
    basePath: "/api/v1",
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          bearerFormat: "X-API-Key",
        },
      },
    },
    openapi: "3.0.0",
  },
  apis: ["./src/routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocs));

//MongoDB database connection

if (process.env.NODE_ENV !== "test")
  // MongoDB
  mongoose
    .connect(databaseString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() =>
      console.log(
        `successfully connected to the ${process.env.NODE_ENV} database`
      )
    )
    .catch((err) => {
      console.log(`error connecting to the ${process.env.NODE_ENV} database`);
      console.log(err);
      process.exit();
    });

schedule.scheduleJob("* * * * 1", async function () {
  try {
    const incidents = await Incident.find({});

    axios
      .post("https://overheid.nl/api/sendIncident", {
        incidents,
      })
      .then(function (response) {
        console.log(response);
        console.log("Data has been send.");
      })
      .catch(function (error) {
        console.log(error);
        console.log("Problem with sending data.");
      });
  } catch {
    res.status(422).json({ IncidentsError: "Can't get incidents." }).end();
  }
});

const userRoute = require("./routes/user.route");
const rideRoute = require("./routes/ride.route");
const carRoute = require("./routes/car.route");
const incidentRoute = require("./routes/incident.route");
app.use("/", userRoute, rideRoute, carRoute, incidentRoute);

app.use("*", function (req, res, next) {
  res.status(402).json({ EndpointError: "Endpoint not found" }).end();
});

app.use(function (err, req, res, next) {
  res
    .status(err.code || 500)
    .json(err)
    .send();
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));

module.exports = app.listen(3000);
