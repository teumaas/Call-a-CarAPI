//Requiring the correct env files by checking NODE_ENV
require('dotenv').config({ path: `${__dirname}/env/config.env` })

const express = require("express");
const morgan = require("morgan"); //HTTP request logger
const bodyParser = require("body-parser"); //Pase request body to JSON
const cors = require("cors"); // Access control
const mongoose = require("mongoose");
const ApiError = require("./models/error.model");

const app = express();

const port = "4000";

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded());

//MongoDB database connection
let databaseString = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose
  .connect(databaseString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("successfully connected to the database"))
  .catch((err) => {
    console.log("error connecting to the database");
    console.log(err);

    //Kill the service on error
    process.exit();
  });

const userRoute = require("./routes/user.route");
app.use("/", userRoute);

app.use("*", function (req, res, next) {
  next(new ApiError("Endpoint not found", 404));
});

app.use(function (err, req, res, next) {
  res
    .status(err.code || 500)
    .json(err)
    .send();
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
