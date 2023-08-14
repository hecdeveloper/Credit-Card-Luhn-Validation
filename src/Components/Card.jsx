import React from "react";
import "./card.css";
import cardChip from './Images/chip.png';
import mLogo from './Images/mastercard.png';
import vLogo from './Images/visa.png';

const Card = ({ cardNumber, cardName, expiration,ccv, cardType }) => {
  return (
    <div className="credit-card">
      <div className="images-row">

    <img className="card-chip" src={cardChip} alt="Card Logo" />
    <img className="card-logo" src={mLogo} alt="mastercard Logo" />
    {/* <img className="card-logo" src={vLogo} alt="mastercard Logo" /> */}
    {/* <div className="card-type">{cardType || "Unknown"}</div> */}
      </div>
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
