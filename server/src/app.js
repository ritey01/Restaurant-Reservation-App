const express = require("express");
const cors = require("cors");
const app = express();
const idFormat = require("./idFormat");

app.use(cors());
app.use(express.json());

app.get("restaurants", async (request, response) => {
  const restaurants = await ReservationModel.find({});
  const formatReservations = reservations.map((reservation) => {
    return reservationFormat(reservation);
  });
  response.send(formatReservations).status(200);
});

module.exports = app;
