import React, { useState } from 'react';
import axios from 'axios';

const CreditCardForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(false); 

    const validateCard = async () => {
        if (!cardNumber || cardNumber.trim() === "") {
            return;
        }

        setLoading(true);

        console.log("Validating card:", cardNumber);

        try {
            const response = await axios.post('https://card-validation-8778dda2604a.herokuapp.com/validate', { cardNumber });         
            setIsValid(response.data.isValid);
        } catch (error) {
            console.error("Error validating card:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`cardform ${isValid ? 'is-valid' : ''}`}>
            <h1>Credit Card Validation</h1>

            <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                className="card-input"
            />

            <button onClick={validateCard} className="validate-button">
                {loading ? "Validating..." : "Validate"}
            </button>

            {isValid !== null && (
                <p>{isValid ? "Valid Card Number!" : "Invalid Card Number."}</p>
            )}
        </div>
    );
}

export default CreditCardForm;
