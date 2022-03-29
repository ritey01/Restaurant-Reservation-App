const idFormat = require("./reservationFormat");

const beforeFormat = {
  _id: "616005cae3c8e880c13dc0b9",
  partySize: 4,
  date: "2023-11-17T06:30:00.000Z",
  userId: "614abe145f317b89a2e36883",
  restaurantName: "Island Grill",
};

const noFormat = {
  id: "616005cae3c8e880c13dc0b9",
  partySize: 4,
  date: "2023-11-17T06:30:00.000Z",
  userId: "614abe145f317b89a2e36883",
  restaurantName: "Island Grill",
};

describe("id formatting", () => {
  it("should return reservation id not _id", () => {
    const expectedResult = {
      id: "616005cae3c8e880c13dc0b9",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Island Grill",
    };
    const result = idFormat(beforeFormat);
    expect(result).toEqual(expectedResult);
  });
  it("should return reservation id when already formatted correctly", () => {
    const expectedResult = {
      id: "616005cae3c8e880c13dc0b9",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Island Grill",
    };
    const result = idFormat(noFormat);
    expect(result).toEqual(expectedResult);
  });
});
