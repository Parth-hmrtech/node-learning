// app.js
const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Set up Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
app.use(express.json());

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

app.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send('Phone number is required');
  }

  const otp = generateOtp();
  
  console.log(`Generated OTP for ${phoneNumber}: ${otp}`);

  client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  })
  .then((message) => {
    res.status(200).send(`OTP sent to ${phoneNumber}`);
  })
  .catch((error) => {
    console.error('Error sending OTP:', error.message);
    res.status(500).send(`Failed to send OTP: ${error.message}`);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
