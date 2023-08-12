import React from "react";
import "./mobile.css";
const Card = ({ cardNumber, cardName }) => {
  return (
    <div className="credit-card">
      <div className="card-number">{cardNumber || "•••• •••• •••• •••"}</div>
      <div className="card-name">{cardName || "Card Holder"}</div>
    </div>
  );
};

export default Card;
