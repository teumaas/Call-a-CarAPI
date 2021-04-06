
var carArray = new ListArray();
var carTypeArray = new ListArray();
var rideArray = new ListArray();

// Cars
let carOne = {id: 1, model: "Corolla", brand: "Toyota", type: 1, entryDate: '2021'};
let carTwo = {id: 2, model: "Mustang", brand: "Ford", type: 1, entryDate: '2021'};
let carThree = {id: 3, model: "Caddy", brand: "Volkswagen", type: 2, entryDate: '2021'};
carArray.push(carOne);
carArray.push(carTwo);
carArray.push(carThree);

// CarTypes
let carTypeOne = {id: 1, typeName: "Regular", pricePerKm: 2.50};
let carTypeTwo = {id: 2, typeName: "Bus", pricePerKm: 3.50};
carTypeArray.push(carTypeOne);
carTypeArray.push(carTypeTwo);

// Rides
let rideOne = {id: 1, car: 1, person: '606c4f0a07b3a66b14c52544', dateTime: 1617719504, distanceInKm: 24.5, paymentFulfilled: false};
let rideTwo = {id: 2, car: 1, person: '606c4f0a07b3a66b14c52544', dateTime: 1617319504, distanceInKm: 12.8, paymentFulfilled: true};
rideArray.push(rideOne);
rideArray.push(rideTwo);
