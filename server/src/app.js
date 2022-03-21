const express = require("express");
const cors = require("cors");
const app = express();
const idFormat = require("./idFormat");
const RestaurantModel = require("./models/RestaurantModel");

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

module.exports = app;
