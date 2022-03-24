import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = ({ restaurantName }) => {
  const [partySize, setPartySize] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsPending(true);

    const reservation = {
      partySize,
      date,
      restaurantName,
    };

    const accessToken = await getAccessTokenSilently();

    const response = await fetch("http://localhost:5001/reservations", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsPending(false);
      console.log("Saved to database");
      navigate("/reservations");
    }
  };

  if (isError) {
    return (
      <>
        <p>Error creating a reservation (error status {errorStatus})</p>
        <Link to="/">Return to reservations</Link>
      </>
    );
  }

  return (
    <>
      <h1>{`Reserve ${restaurantName}`}</h1>
      <form onSubmit={handleSubmit}>
        <label>Number of guests</label>
        <input
          id="partySize"
          type="text "
          required
          value={partySize}
          onChange={(event) => {
            setPartySize(event.target.value);
          }}
        />
        <label>Date</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          dateFormat="Pp"
          id="date"
          required
          value={date}
        />

        {!isPending && <button>Submit</button>}
        {isPending && <button>Adding reservation...</button>}
      </form>
    </>
  );
};

export default CreateReservation;
