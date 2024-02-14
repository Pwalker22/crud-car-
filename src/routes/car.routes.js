const express = require('express');
const Car = express.Router();
const CarController = require('../controller/controller.cars');

Car.get("/car", CarController.allCar)

.post("/insertCar", CarController.addCar)

.put("/updateCar/:idcar", CarController.updateCar)

.patch("/deleteCar/:idcar", CarController.deleteCar);

Car.get("/consultCar/:idcar", CarController.consultCar);

module.exports = Car;