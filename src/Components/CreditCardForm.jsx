import React, { useState } from "react";
import axios from "axios";
import Card from "./Card";
import cardChip from './Images/chip.png';


const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [ccv, setCcv] = useState("");

  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value) => {
    // Removing all non-digits
    const cleaned = value.replace(/\D+/g, "");

    // Adding spaces every 4 characters
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";

    return formatted;
  };
  const handleExpirationChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D+/g, ""); // Removing all non-digits

    // Setting MM/YY format
    let formatted = cleaned;
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    setExpiration(formatted);
  };
  const handleCcvChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D+/g, ""); // Removing all non-digits

    // Ensuring only the first 3 characters are considered
    const formatted = cleaned.slice(0, 3);

    setCcv(formatted);
  };

  const handleCardInputChange = (e) => {
    e.target.value = formatCardNumber(e.target.value);
    setCardNumber(e.target.value);

    // Clear the validation message if the input is empty
    if (!e.target.value || e.target.value.trim() === "") {
      setIsValid(null);
    }
  };

  const validateCard = async () => {
    if (!cardNumber || cardNumber.trim() === "") {
      return;
    }

    setLoading(true);

    console.log("Validating card:", cardNumber);

    try {
      const response = await axios.post(
        "https://card-validation-8778dda2604a.herokuapp.com/validate",
        { cardNumber: cardNumber.replace(/\s+/g, "") } // removing spaces before sending to server
      );
      setIsValid(response.data.isValid);
    } catch (error) {
      console.error("Error validating card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card cardNumber={cardNumber} cardName={cardName} expiration={expiration}  ccv={ccv}/>
      <div className="layout">
      <div className="container">
        <div className={`cardform ${isValid ? "is-valid" : ""}`}>
          <div className="card-line">
          <img className="card-chip" src={cardChip} alt="Card Logo" />
          </div>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Enter cardholder name"
            className="card-input"
          />
          <input
            type="tel"
            id="cardNumber"
            value={cardNumber}
            maxLength="22"
            minLength="12"
            onChange={handleCardInputChange}
            placeholder="Enter your card number"
            className="card-input"
          />
          <div className="row">
            <input
              type="tel"
              value={expiration}
              maxLength="7"
              onChange={handleExpirationChange}
              placeholder="MM/YY"
              className="card-input half-width"
            />
            <input
              type="tel"
              value={ccv}
              maxLength="3" // Max 3 characters for CVV
              onChange={handleCcvChange}
              placeholder="CCV"
              className="card-input half-width"
            />
          </div>
    
   
        </div>
        <button onClick={validateCard} className="validate-button">
          {loading ? "Validating..." : "Validate"}
        </button>
        {isValid !== null && (
            <div className={isValid ? "valid" : "invalid"}>
              <span>
                {isValid ? "Valid Card Number!" : "Invalid Card Number."}
              </span>
            </div>
          )}
      </div>
      </div>
    </>
  );
};

export default CreditCardForm;
