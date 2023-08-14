const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests.
app.use(express.json());

const whitelist = ['https://creditcard-luhn-validation.netlify.app', 'http://localhost:3000'];

// Use the CORS middleware with the above options
app.use(cors({
  origin: whitelist,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

function getCardType(cardNumber) {
  // Visa
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
    return 'Visa';
  }
  // Mastercard
  else if (/^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/.test(cardNumber)) {
    return 'Mastercard';
  }
  // American Express
  else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
    return 'American Express';
  }
  return 'Unknown';
}


// Luhn Algorithm Validation
function isValidCreditCard(value) {
  // The Luhn algorithm works by starting from the rightmost digit
  // and moving to the left, doubling the value of every second digit.
  // If doubling results in a number greater than 9, we subtract 9 from it.
  // The validity of the card is determined by taking the sum of all digits
  // and checking if it's divisible by 10.

  // Check for non-digit characters. If present, the card number is invalid.
  if (/[^0-9\s]+/.test(value)) return false;

  // Remove spaces for uniformity.
  value = value.replace(/\s+/g, "");

  // Check for a typical length of credit card numbers.
  if (value.length < 13 || value.length > 19) return false;

  let nCheck = 0,
    bEven = false;

  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n);
    let nDigit = parseInt(cDigit, 10);

    // If the position is even, double the number.
    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9; // Subtract 9 if doubled number > 9.
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  // The final validation. The sum of numbers must be divisible by 10.
  return nCheck % 10 === 0;
}

// This route is responsible for validating the credit card number.
app.post("/validate", (req, res) => {
  const { cardNumber } = req.body;

  // Check if the input is a string and is not empty.
  // Return an error if the input is not as expected.
  if (typeof cardNumber !== "string" || cardNumber.trim() === "") {
    return res.status(400).json({ error: "Invalid input" });
  }
  const cardType = getCardType(cardNumber);
  // Use the Luhn Algorithm function to validate the credit card.
  // Respond with the result of the validation.
  if (isValidCreditCard(cardNumber)) {
    res.json({ isValid: true, cardType: cardType });
  } else {
    res.json({ isValid: false, cardType: cardType });
  }
});

// CORS middleware options
app.options('/validate', (req, res) => {
  res.sendStatus(200); 
});



// Start the server on the provided PORT.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

