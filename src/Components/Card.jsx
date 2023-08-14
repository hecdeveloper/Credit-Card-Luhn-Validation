import React from "react";
import "./card.css";
import cardChip from "./Images/chip.png";
import mLogo from "./Images/mastercard.png";
import vLogo from "./Images/visa.png";

const Card = ({ cardNumber, cardName, expiration, ccv, cardType, isEmpty }) => {
  return (
    <div className="credit-card">
      <div className="images-row">
        <img className="card-chip" src={cardChip} alt="Card Logo" />
        {cardType === "Mastercard" && !isEmpty && (
          <img className="card-logo" src={mLogo} alt="Mastercard Logo" />
        )}
        {cardType === "Visa" && !isEmpty && (
          <img className="card-logo" src={vLogo} alt="Visa Logo" />
        )}
        {(isEmpty || (cardType !== "Mastercard" && cardType !== "Visa")) && (
          <div style={{margin: "10px"}}>Card Type</div>
        )}
      </div>
      <div className="card-number">{cardNumber || "•••• •••• •••• •••"}</div>
      <div className="card-row">
        <div className="card-expiry">{expiration || "MM/YY"}</div>
        <div className="card-expiry">{ccv || "CCV"}</div>
      </div>
      <div className="card-name">{cardName || "First Name Last Name"}</div>
    </div>
  );
};

export default Card;
