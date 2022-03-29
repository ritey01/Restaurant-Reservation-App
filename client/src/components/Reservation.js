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
  const [errorStatus, setErrorStatus] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const fetchUrl = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (
        fetchUrl.status === 400 ||
        fetchUrl.status === 404 ||
        fetchUrl.status === 403
      ) {
        setErrorStatus(true);
        return;
      }

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

  if (errorStatus) {
    return (
      <>
        <h1 className="noResTitle">Sorry! We can't find that reservation</h1>
        <div className="resBackBtnError">
          <Link to={`/reservations`} className="resBackLink">
            &larr;Back to reservations
          </Link>
        </div>
      </>
    );
  }
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
      <section>
        <div className="resCard">
          <h1 className="reservationName">{reservation.restaurantName}</h1>
          <p className="reservationDate">{formatDate(reservation.date)}</p>
          <p className="partySizeRes">
            Party size:{" "}
            <span className="partySizeNum">{reservation.partySize}</span>
          </p>
        </div>
        <div className="resBackBtn">
          <Link to={`/reservations`} className="resBackLink">
            &larr;Back to reservations
          </Link>
        </div>
      </section>
    </>
  );
};

export default Reservation;
