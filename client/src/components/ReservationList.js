import React, { useState, useEffect } from "react";
import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const ReservationList = () => {
  const [reservations, setReservation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchReservations = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch("http://localhost:5001/reservations", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Im here");
      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }
      const reservationData = await response.json();
      console.log(reservationData);
      setReservation(reservationData);
      setIsLoading(false);
    };
    fetchReservations();
  }, [getAccessTokenSilently]);

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
      <h1>Upcoming reservations</h1>
      {reservations.map((reservation) => {
        return (
          <ul key={reservation.id}>
            <li>
              <div>
                <h2 class="reservationName">{reservation.restaurantName}</h2>
                <p class="reservationDate">{reservation.date}</p>
                <div>
                  <Link to={`/reservations/${reservation.id}`}>
                    {/* {" "} */}
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default ReservationList;
