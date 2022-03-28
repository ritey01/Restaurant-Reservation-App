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

      if (response.status === 404) {
        setIsNotFound(true);
        return;
      }
      const reservationData = await response.json();

      setReservation(reservationData);
      setIsLoading(false);
    };
    fetchReservations();
  }, [getAccessTokenSilently]);

  if (isNotFound) {
    return (
      <>
        <h1 className="notFoundTitle">Upcoming reservations</h1>
        <p>You don't have any reservations.</p>
        <Link to={`/`} className="restaurantLink">
          View the restaurants
        </Link>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1 className="reservationTitle">Upcoming reservations</h1>
      {reservations.map((reservation) => {
        return (
          <ul key={reservation.id} className="reservationCard">
            <li>
              <div className="reservationList">
                <h2 class="reservationName">{reservation.restaurantName}</h2>

                <p class="reservationDate">{formatDate(reservation.date)}</p>

                <Link
                  to={`/reservations/${reservation.id}`}
                  className="detailsLink"
                >
                  {/* {" "} */}
                  View details &rarr;
                </Link>
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default ReservationList;
