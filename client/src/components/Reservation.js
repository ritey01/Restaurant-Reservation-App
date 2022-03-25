import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";

const Reservation = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Reservation</h1>
    </>
  );
};

export default Reservation;
