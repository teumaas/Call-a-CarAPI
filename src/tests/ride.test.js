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

// describe("", () => {
//   it("Post to /rides creates a new ride",() => {
//     Ride.countDocuments().then((count) => {
//       chai.request(server)
//         .post("/rides")
//         .set({ "Authorization": `Bearer ${bearerUser}` })
//         .expect(200)
//         .send({
//           "car": carOneID,
//           "dateTime": new Date().toISOString(),
//           "pickupAddress": "Jansteenlaan 120",
//           "pickupZipcode": "1234AB",
//           "destinationAddress": "Pietjanlaan",
//           "destinationZipcode": "4321 BA"
//         })
//         .end((err, res) => {
//           console.log(res)
//           Ride.countDocuments().then((newCount) => {
//             assert(count + 1 === newCount);
//             done();
//           });
//         });
//     });
//   });
// });

describe("Tests for the /rides endpoint.", () => {

  const bearerUser = sampleData.loginUser(
    "user@website.com",
    "password",
    "http://localhost:4000/users/login"
  );

  it("Post to /rides creates a new ride", (done) => {
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
      .set("Authorization", `Bearer ${bearerUser}`)
      .send(ride)
      .end((err, res) => {
        //console.log(res)
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      });
  });
});
