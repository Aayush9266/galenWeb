const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like Outlook, etc.
  auth: {
    user: 'ayushasati04@gmail.com', // Replace with your email
    pass: 'syba fmzw upqy tqxx',  // Replace with your email password or app password
  },
});

// API endpoint to send the email
app.post('/send-email', (req, res) => {
  const { email } = req.body;

  // Email details
  const mailOptions = {
    from: 'ayushasati04@gmail.com', // Replace with your email
    to: email,
    subject: 'Login Successful',
    text: 'Welcome to Galen , you have succesfully Logged in',
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
