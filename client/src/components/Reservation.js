import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const fetchUrl = await fetch(`http://localhost:5001/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (fetchUrl.ok === false) {
        setIsNotFound(true);
        return;
      }
      const reservationData = await fetchUrl.json();
      setReservation(reservationData);
      setIsLoading(false);
    };
    fetchData();
  }, [getAccessTokenSilently, id]);

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
      <h1>Reservation</h1>
      <section>
        <h2 class="reservationName">{reservation.restaurantName}</h2>
        <p class="reservationDate">{formatDate(reservation.date)}</p>
        <div>
          <Link to={`/reservations`}>
            {/* {" "} */}
            &larr;Back to reservations
          </Link>
        </div>
      </section>
    </>
  );
};

export default Reservation;
