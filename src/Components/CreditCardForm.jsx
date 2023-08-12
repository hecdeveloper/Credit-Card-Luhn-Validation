import React, { useState } from "react";
import axios from "axios";
import Card from "./Card";

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("Card Holder");
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
      <Card cardNumber={cardNumber} cardName={cardName} />
      <div className="container">
        <div className={`cardform ${isValid ? "is-valid" : ""}`}>
          <input
            type="text"
            //   value={cardholderName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Enter cardholder name"
            className="card-input"
          />
          <input
            type="tel"
            
            value={cardNumber}
            maxLength="22"
            minLength="12"
            onChange={handleCardInputChange}
            placeholder="Enter your card number"
            className="card-input"
          />
          <div className="row">
            <input
              type="text"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              placeholder="MM/YY"
              className="card-input half-width"
            />
            <input
              type="tel"
              value={ccv}
              onChange={(e) => setCcv(e.target.value)}
              placeholder="CCV"
              className="card-input half-width"
            />
          </div>
          {isValid !== null && (
            <div className={isValid ? "valid" : "invalid"}>
              <span>
                {isValid ? "Valid Card Number!" : "Invalid Card Number."}
              </span>
            </div>
          )}

          <button onClick={validateCard} className="validate-button">
            {loading ? "Validating..." : "Validate"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreditCardForm;
