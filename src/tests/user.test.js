const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const sampleData = require("../database/sample.data.database");
const Ride = require("../models/ride.model");
const should = chai.should();

chai.use(chaiHttp);

describe("Tests for the /rides endpoint.", () => {

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNoYXJlRGF0YSI6dHJ1ZSwicm9sZXMiOlsiYWRtaW4iXSwicGF5QnlGaW5nZXJwcmludFRva2VuIjp0cnVlLCJfaWQiOiI2MDczNjE5MmYxOTZkYTZlMTRmZjhhZjUiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6InVzZXJAd2Vic2l0ZS5jb20iLCJwaG9uZU51bWJlciI6IiszMSA2IDEyMzQ1Njc4IiwiYWRkcmVzcyI6IkphbnN0ZWVubGFhbiAxMSIsInppcENvZGUiOiIxMjM0QUIiLCJwYXNzd29yZCI6IiQyYiQxMCRoT1VocGViekRGOHhxZUxlMzR3Z0FPM21wRGkvaVRiY2E2UkRQT1FSbm1ERVFYbHVTdTIudSIsImNyZWF0ZWQiOiIyMDIxLTA0LTExVDIwOjUyOjM0LjQwMFoifSwiaWF0IjoxNjE4MTc0MzU0LCJleHAiOjE2MTg3NTAzNTR9._Mx-VbXB974xf6zYpjbKjJ3ZKbEB7uaisrV0VEOk_aI";


    it("Post to /users/register registers a User", (done) => {
          chai
            .request(server)
            .post("/users/register")
            .send({
                "firstName": "Freddy",
                "lastName": "Kruger",
                "email": "freddy@kruger.nl",
                "shareData": "true",
                "phoneNumber": "0600000000",
                "address": "Teststraat 34",
                "zipCode": "4040AA",
                "password": "1234"
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
        
      });

      it("Post to /users/register with missing values returns error", (done) => {
        chai
          .request(server)
          .post("/users/register")
          .send({
              "firstName": "Freddy",
              "shareData": "true",
              "phoneNumber": "0600000000",
              "address": "Teststraat 34",
              "zipCode": "4040AA",
              "password": "1234"
          })
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            done();
          });
      
    });

      it("Post to /users/login with invalid credentials returns 422 error", (done) => {
        chai
          .request(server)
          .post("/users/login")
            .send({
                "email": "freddy@kruger.nl",
                "password": "21231"
            })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            done();
          });
      
    });

      it("Post to /users/ logs in a User after Registering", (done) => {
        chai
            .request(server)
            .post("/users/register")
            .send({
                "firstName": "Freddy",
                "lastName": "Kruger",
                "email": "freddy@kruger.nl",
                "shareData": "true",
                "phoneNumber": "0600000000",
                "address": "Teststraat 34",
                "zipCode": "4040AA",
                "password": "1234"
            })
            .end((err, res) => {
                chai
                .request(server)
                .post("/users/login")
                .set("Authorization", "Bearer " + token)
                .send({
                    "email": "freddy@kruger.nl",
                    "password": "1234"
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  done();
                });
            });
    });
});
