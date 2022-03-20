const idFormat = require("./idFormat");

const beforeFormat = {
  _id: "616005cae3c8e880c13dc0b9",
  name: "Curry Place",
  description:
    "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
  image: "https://i.ibb.co/yftcRcF/indian.jpg",
};

describe("id formatting", () => {
  it("should return id not _id", () => {
    const expectedResult = {
      id: "616005cae3c8e880c13dc0b9",
      name: "Curry Place",
      description:
        "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
      image: "https://i.ibb.co/yftcRcF/indian.jpg",
    };
    const result = idFormat(beforeFormat);
    expect(result).toEqual(expectedResult);
  });
  it("should return id: when id is already :id", () => {
    const expectedResult = {
      id: "616005cae3c8e880c13dc0b9",
      name: "Curry Place",
      description:
        "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
      image: "https://i.ibb.co/yftcRcF/indian.jpg",
    };
    const result = idFormat(expectedResult);
    expect(result).toEqual(expectedResult);
  });
});
