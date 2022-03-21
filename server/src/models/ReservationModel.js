const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  partySize: { type: String, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
  restaurantName: { type: String, required: true },
});

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;
