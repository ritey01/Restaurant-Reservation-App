const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
