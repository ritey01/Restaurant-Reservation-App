import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RestaurantList.css";

const RestaurantList = () => {
  const [restaurants, setRestaurant] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch("http://localhost:5001/restaurants");

      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }
      const restaurantData = await response.json();
      console.log(restaurantData);
      setRestaurant(restaurantData);
      setIsLoading(false);
    };
    fetchRestaurants();
  }, []);

  if (isNotFound) {
    return (
      <>
        <p className="error">Sorry! Page not found.</p>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Restaurants</h1>
      {restaurants.map((restaurant) => {
        return (
          <ul key={restaurant.id}>
            <li>
              <div>
                <img src={restaurant.image} alt={restaurant.name} />
              </div>
              <div>
                <h2>{restaurant.name}</h2>
              </div>
              <div>
                <p>{restaurant.description}</p>
              </div>
              <div>
                <Link to={`/restaurant/${restaurant.id}`}>
                  {" "}
                  Reserve now &rarr;
                </Link>
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default RestaurantList;
