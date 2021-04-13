const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const sampleData = require("../database/sample.data.database");
const Ride = require("../models/ride.model");
const should = chai.should();

// Toyota - Corolla
const carOneID = "606da350c579dbffc3c2725b";
// Ford - Mustang
const carTwoID = "606d9d888b488ffb4541fab2";
// Invalid ID for usage.
const invalidID = "6073232d9d07c17b1ab874e9";

chai.use(chaiHttp);

describe("Tests for the /rides endpoint.", () => {

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNoYXJlRGF0YSI6dHJ1ZSwicm9sZXMiOlsiYWRtaW4iXSwicGF5QnlGaW5nZXJwcmludFRva2VuIjp0cnVlLCJfaWQiOiI2MDczNjE5MmYxOTZkYTZlMTRmZjhhZjUiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6InVzZXJAd2Vic2l0ZS5jb20iLCJwaG9uZU51bWJlciI6IiszMSA2IDEyMzQ1Njc4IiwiYWRkcmVzcyI6IkphbnN0ZWVubGFhbiAxMSIsInppcENvZGUiOiIxMjM0QUIiLCJwYXNzd29yZCI6IiQyYiQxMCRoT1VocGViekRGOHhxZUxlMzR3Z0FPM21wRGkvaVRiY2E2UkRQT1FSbm1ERVFYbHVTdTIudSIsImNyZWF0ZWQiOiIyMDIxLTA0LTExVDIwOjUyOjM0LjQwMFoifSwiaWF0IjoxNjE4MTc0MzU0LCJleHAiOjE2MTg3NTAzNTR9._Mx-VbXB974xf6zYpjbKjJ3ZKbEB7uaisrV0VEOk_aI";

  it("Post to /rides creates a new ride", (done) => {
    let bearerToken = "";
    const bearerUser = sampleData.loginUser(
      "user@website.com",
      "1234",
      "http://localhost:4000/users/login"
    ).then(() => {
      let ride = {
        car: carOneID,
        dateTime: new Date().toISOString(),
        pickupAddress: "Jansteenlaan 120",
        pickupZipcode: "1234AB",
        destinationAddress: "Pietjanlaan",
        destinationZipcode: "4321 BA",
      };
      chai
        .request(server)
        .post("/rides")
        .set("Authorization", "Bearer " + token)
        .send(ride)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    })
  });

  it("Post to /rides with missing attribute returns error", (done) => {
    const bearerUser = sampleData.loginUser(
      "user@website.com",
      "1234",
      "http://localhost:4000/users/login"
    ).then(() => {
      let ride = {
        car: carTwoID,
        dateTime: new Date().toISOString(),
      };
      chai
        .request(server)
        .post("/rides")
        .set("Authorization", "Bearer " + token)
        .send(ride)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    })
  });

  it("Post to /rides with missing Authorization header returns Unauthorized error", (done) => {
    const bearerUser = sampleData.loginUser(
      "user@website.com",
      "1234",
      "http://localhost:4000/users/login"
    ).then(() => {
      let ride = {
        car: carOneID,
        dateTime: new Date().toISOString(),
      };
      chai
        .request(server)
        .post("/rides")
        .send(ride)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          done();
        });
    })
  });

  it("Post to /rides with wrong Authorization header value returns Unauthorized error", (done) => {
    const bearerUser = sampleData.loginUser(
      "user@website.com",
      "1234",
      "http://localhost:4000/users/login"
    ).then(() => {
      let ride = {
        car: carOneID,
        dateTime: new Date().toISOString(),
      };
      chai
        .request(server)
        .post("/rides")
        .set("Authorization", "Bearer " + "2134123fdsfaw34faf")
        .send(ride)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          done();
        });
    })
  });

  it("Post to /rides with non-existant Car ID returns error", (done) => {
    const bearerUser = sampleData.loginUser(
      "user@website.com",
      "1234",
      "http://localhost:4000/users/login"
    ).then(() => {
      let ride = {
        car: invalidID,
        dateTime: new Date().toISOString(),
      };
      chai
        .request(server)
        .post("/rides")
        .set("Authorization", "Bearer " + token)
        .send(ride)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    })
  });
});
