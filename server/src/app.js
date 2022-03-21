const express = require("express");
const cors = require("cors");
const app = express();
const idFormat = require("./idFormat");
const RestaurantModel = require("./models/RestaurantModel");
const validId = require("./utils/validId");

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (request, response, next) => {
  try {
    const restaurants = await RestaurantModel.find({});
    const formatRestaurant = restaurants.map((restaurant) => {
      return idFormat(restaurant);
    });
    response.send(formatRestaurant).status(200);
  } catch (error) {
    next(error);
  }
});

app.get("/restaurants/:id", async (request, response, next) => {
  const id = request.params.id;
  if (validId(id) === false) {
    throw new Error("Invalid ID is provided");

    // return response.status(400).send({ message: "Invalid ID is provided" });
  }
  try {
    const restaurant = await RestaurantModel.findById(id);
    const formatRestaurant = idFormat(restaurant);

    return response.status(200).send(formatRestaurant);
  } catch (error) {
    if (!response) {
      return response.status(404).send({
        message: "The restaurant trying to be retrieved does not exist",
      });
    }
  }
});

module.exports = app;
