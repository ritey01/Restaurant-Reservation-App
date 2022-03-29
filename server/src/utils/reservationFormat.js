const reservationFormat = (formatObject) => {
  if ("_id" in formatObject) {
    return {
      id: formatObject._id,
      partySize: formatObject.partySize,
      date: formatObject.date,
      userId: formatObject.userId,
      restaurantName: formatObject.restaurantName,
    };
  } else {
    return formatObject;
  }
};
module.exports = reservationFormat;
