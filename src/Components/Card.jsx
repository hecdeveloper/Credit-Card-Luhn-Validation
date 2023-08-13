import React from "react";
import "./card.css";
import cardChip from './Images/chip.png';

const Card = ({ cardNumber, cardName, expiration,ccv }) => {
  return (
    <div className="credit-card">
    <img className="card-chip" src={cardChip} alt="Card Logo" />
      <div className="card-number">{cardNumber || "•••• •••• •••• •••"}</div>
      <div className="card-row">
      <div className="card-expiry">{expiration||"MM/YY"}</div>
      <div className="card-expiry">{ccv||"CCV"}</div>
      </div>
      <div className="card-name">{cardName || "First Name Last Name"}</div>
    </div>
  );
};

export default Card;
