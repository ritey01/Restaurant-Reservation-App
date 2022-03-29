import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = await fetch(`http://localhost:5001/restaurants/${id}`);

      if (fetchUrl.ok === false) {
        setIsNotFound(true);
        return;
      }
      const restaurantData = await fetchUrl.json();
      setRestaurant(restaurantData);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

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
      <section className="restaurantWrapper">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurantImg"
        />
        <div className="gridDisplay">
          <h1 className="restaurantName">{restaurant.name}</h1>
          <p>{restaurant.description}</p>
        </div>
      </section>

      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
