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

app.get("/restaurants/:id", async (request, response) => {
  const id = request.params.id;
  if (validId(id) === false) {
    return response.status(400).send({ error: "invalid id is provided" });
  }

  const restaurant = await RestaurantModel.findById(id);
  if (!restaurant) {
    return response.status(404).send({
      error: "restaurant not found",
    });
  }
  const formatRestaurant = restaurantFormat(restaurant);

  return response.status(200).send(formatRestaurant);
});

app.get("/reservations", checkJwt, async (request, response, next) => {
  const { auth } = request;

  try {
    const reservations = await ReservationModel.find({
      userId: auth.payload.sub,
    });

    if (reservations === null) {
      return response.status(404).send({
        error: "not found",
      });
    }

    const formatReservations = reservations.map((reservation) => {
      if (reservation.userId !== auth.payload.sub) {
        return response.status(403).send({
          error: "user does not have permission to access this reservation",
        });
      }
      return reservationFormat(reservation);
    });

    response.send(formatReservations).status(200);
  } catch (error) {
    next(error);
  }
});

app.get("/reservations/:id", checkJwt, async (request, response) => {
  const id = request.params.id;

  if (validId(id) === false) {
    return response.status(400).send({ error: "invalid id provided" });
  }

  const reservation = await ReservationModel.findById(id);
  if (!reservation) {
    return response.status(404).send({
      error: "not found",
    });
  }
  if (reservation.userId !== request.auth.payload.sub) {
    return response.status(403).send({
      error: "user does not have permission to access this reservation",
    });
  }

  const formatReservation = reservationFormat(reservation);

  return response.status(200).send(formatReservation);
});

app.use(errors());
module.exports = app;
