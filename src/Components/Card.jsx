import React from "react";
import "./card.css";
import cardChip from './Images/chip.png';

const Card = ({ cardNumber, cardName }) => {
  return (
    <div className="credit-card">
    
    <img className="card-chip" src={cardChip} alt="Card Logo" />
      <div className="card-number">{cardNumber || "•••• •••• •••• •••"}</div>
      {/* Example of additional details */}
      <div className="card-expiry">MM/YY</div>
      <div className="card-expiry">MM/YY</div>{" "}
      <div className="card-name">{cardName || "Card Holder"}</div>
    </div>
  );
};

export default Card;
