const express = require("express");
const cors = require("cors");
const app = express();
const { celebrate, Joi, errors, Segments } = require("celebrate");
const restaurantFormat = require("./utils/restaurantFormat");
const reservationFormat = require("./utils/reservationFormat");
const RestaurantModel = require("./models/RestaurantModel");
const ReservationModel = require("./models/ReservationModel");
const validId = require("./utils/validId");
const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: "https://restaurantRes.com",
  issuerBaseURL: `https://dev-dfkojg63.us.auth0.com/`,
});

app.use(cors());
app.use(express.json());

app.post(
  "/reservations",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      partySize: Joi.number().min(1).required(),
      date: Joi.date().greater("now").required(),
      restaurantName: Joi.string().required(),
    }),
  }),
  async (request, response, next) => {
    try {
      const { body, auth } = request;
      const document = { userId: auth.payload.sub, ...body };

      const reservation = new ReservationModel(document);
      await reservation.save();
      return response.status(201).send(reservationFormat(reservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);
app.get("/restaurants", async (request, response, next) => {
  try {
    const restaurants = await RestaurantModel.find({});
    const formatRestaurant = restaurants.map((restaurant) => {
      return restaurantFormat(restaurant);
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
    const formatRestaurant = restaurantFormat(restaurant);

    return response.status(200).send(formatRestaurant);
  } catch (error) {
    if (!response) {
      return response.status(404).send({
        message: "The restaurant trying to be retrieved does not exist",
      });
    }
  }
});
app.use(errors());
module.exports = app;
