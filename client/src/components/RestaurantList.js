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
      <h1 className="mainTitle">Restaurants</h1>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => {
          return (
            <li className="restaurantCard" key={restaurant.id}>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurantImg"
              />

              <div>
                <h2 className="restaurantName">{restaurant.name}</h2>
                <p className="restaurantDescript">{restaurant.description}</p>
                <div>
                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="reserveButton"
                  >
                    Reserve now &rarr;
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RestaurantList;
