const app = require("./app");
const request = require("supertest");
const mongoose = require("mongoose");
const { response } = require("./app");

describe("App", () => {
  test("GET /reservations returns all reservations", async () => {
    const expected = [
      {
        partySize: 4,
        date: "2023-11-17T06:30:00.000Z",
        userId: "mock-user-id",
        restaurantName: "Island Grill",
      },
      {
        partySize: 2,
        date: "2023-12-03T07:00:00.000Z",
        userId: "mock-user-id",
        restaurantName: "Green Curry",
      },
    ];
    let id;

    await request(app)
      .get("/reservations")
      .expect(200)
      .expect((res) => {
        id = res.body.id;
        expect(res.body).toEqual(expect.arrayContaining(expected));
        expect(id).toBeTruthy();
      });
  });
  test("POST /reservations creates a new property", async () => {
    const body = {
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };
    let id;
    await request(app)
      .post("/reservations")
      .send(body)
      .set("Accept", "application/json")
      .expect(201)
      .expect((res) => {
        id = res.body.id;
        expect(res.body).toEqual(expect.objectContaining(body));
        expect(id).toBeTruthy();
        const isValidId = mongoose.Types.ObjectId.isValid(res.body.id);
        expect(isValidId).toEqual(true);
      });

    // await request(app)
    //   .get(`/reservations/${id}`)
    //   .expect(200)
    //   .expect((res) => {
    //     const expected = {
    //       id,
    //       ...body,
    //     };
    //     expect(res.body).toEqual(expected);
    //   });
  });

  test("POST /reservations returns a 400 when an invalid request body is provided", async () => {
    const expectedStatus = 400;
    const body = {};

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });

  // test("POST /reservations returns a 401 when a user is not authenticated", async () => {
  //   const expectedStatus = 401;
  //   const body = {};

  //   await request(app).post("/reservations").send(body).expect(expectedStatus);
  // });
  test("GET /restaurants returns all restaurants", async () => {
    const expected = [
      {
        id: "616005cae3c8e880c13dc0b9",
        name: "Curry Place",
        description:
          "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
        image: "https://i.ibb.co/yftcRcF/indian.jpg",
      },
      {
        id: "616005e26d59890f8f1e619b",
        name: "Thai Isaan",
        description:
          "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
        image: "https://i.ibb.co/HPjd2jR/thai.jpg",
      },
      {
        id: "616bd284bae351bc447ace5b",
        name: "Italian Feast",
        description:
          "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
        image: "https://i.ibb.co/0r7ywJg/italian.jpg",
      },
    ];
    await request(app)
      .get("/restaurants")
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expected);
      });
  });
  it("Should return 404 status with GET endpoint /reservation", async () => {
    await request(app).get("/reservation").expect(404);
  });

  it("Should return a single restaurant with GET /restaurant:id", async () => {
    const expected = {
      id: "616005cae3c8e880c13dc0b9",
      name: "Curry Place",
      description:
        "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
      image: "https://i.ibb.co/yftcRcF/indian.jpg",
    };
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b9")
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expected);
      });
  });
  test("GET restaurants/:id 400 status code and message: 'Invalid ID is provided' with an invalid ID", async () => {
    const expected = { error: "invalid id is provided" };

    await request(app)
      .get("/restaurants/crazy")
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual(expected);
      });
  });

  test("GET restaurants/:id 404 status code and 'error: restaurant not found'", async () => {
    const expected = { error: "restaurant not found" };

    await request(app)
      .get("/restaurants/618005cae3c8e880c13dc0b9")
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual(expected);
      });
  });
});
