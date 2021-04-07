// Cars
exports.carArray = [
    {id: 1, model: "Corolla", brand: "Toyota", type: {id: 1, typeName: "Regular", pricePerKm: 2.50}, entryDate: '2021'},
    {id: 2, model: "Mustang", brand: "Ford", type: 1, entryDate: '2021'},
    {id: 3, model: "Caddy", brand: "Volkswagen", type: 2, entryDate: '2021'}
]

// CarTypes
exports.carTypesArray = [
    {id: 1, typeName: "Regular", pricePerKm: 2.50},
    {id: 2, typeName: "Bus", pricePerKm: 3.50}
]

// Rides
exports.rideArray = [
    {id: 1, car: 1, person: '606c4f0a07b3a66b14c52544', dateTime: 1617719504, distanceInKm: 24.5, paymentFulfilled: false},
    {id: 2, car: 1, person: '606c4f0a07b3a66b14c52544', dateTime: 1617319504, distanceInKm: 12.8, paymentFulfilled: true}
]
