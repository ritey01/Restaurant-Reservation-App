const reservationFormat = (formatObject) => {
  return {
    id: formatObject._id,
    partySize: formatObject.partySize,
    date: formatObject.date,
    userId: formatObject.userId,
    restaurantName: formatObject.restaurantName,
  };
};
module.exports = reservationFormat;
