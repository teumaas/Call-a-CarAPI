require("dotenv").config({ path: `${__dirname}/env/config.env` });
const mongoose = require("mongoose");
const Car = require("../models/ride.model");
const CarType = require("../models/ride.model");
const sampleData = require("../database/sample.data.database");

//This code is executed every time NPM TEST is called
before((done) => {
  //Connects to the test database
  const databaseString = `mongodb://${process.env.DB_HOST_DEV}/${process.env.DB_NAME_DEV}`;

  mongoose
    .connect(databaseString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(
        `successfully connected to the ${process.env.NODE_ENV} database`
      );
    })
    .catch((err) => {
      console.log(`error connecting to the ${process.env.NODE_ENV} database`);
      console.log(err);
      process.exit();
    });
  mongoose.connection
    .once("open", () => done())
    .on("error", (err) => {
      console.warn("Warning", error);
    });
});

//This code is executed every time an individual test runs
beforeEach((done) => {
  const { rides, users } = mongoose.connection.collections;
  //Drops all the threads and comments from the test database.
  rides.drop().then(
    users
      .drop()
      .then(() => {
        sampleData.createUser("user@website.com", "password", "admin");
        sampleData.createUser("user2@website.com", "password", "user");
        sampleData.loadCar();
        sampleData.loadCarTypes();
      })
      .then(() => done())
      .catch(() => done())
      .catch(() => done())
  );
});
