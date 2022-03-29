const restaurantFormat = (formatObject) => {
  if ("_id" in formatObject) {
    return {
      id: formatObject._id,
      name: formatObject.name,
      description: formatObject.description,
      image: formatObject.image,
    };
  } else {
    return formatObject;
  }
};
module.exports = restaurantFormat;
