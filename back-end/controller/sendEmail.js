import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sachingupta705242@gmail.com",
    pass: "sg705242",
  },
});

// Email options
const mailOptions = {
  from: "sachinggupta705242@gmail.com",
  to: "sachingupta873701@gmail.com",
  subject: "Test Email from Node.js",
  text: "Hello! This is a test email sent using Nodemailer.",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Error sending email:", error);
  }
  console.log("Email sent:", info.response);
});
