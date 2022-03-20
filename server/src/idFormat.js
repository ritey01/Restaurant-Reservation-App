const idFormat = (formatObject) => {
  return {
    id: formatObject._id,
    name: formatObject.name,
    description: formatObject.description,
    image: formatObject.image,
  };
};
module.exports = idFormat;
