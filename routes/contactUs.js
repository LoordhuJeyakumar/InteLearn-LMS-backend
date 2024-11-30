// routes/contactUs.js
const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactUs");

// POST endpoint to submit the contact us form
router.post("/", async (req, res) => {
  const { firstname, lastname, email, phoneNo, countrycode, message } =
    req.body;

  // Validate required fields
  if (!firstname || !email || !phoneNo || !countrycode || !message) {
    return res.status(400).json({
      message:
        "Please provide all required fields: firstname, email, phoneNo, countrycode, message",
    });
  }

  try {
    const newContact = new ContactUs({
      firstname,
      lastname,
      email,
      phoneNo,
      countrycode,
      message,
    });

    await newContact.save();
    res
      .status(201)
      .json({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error while saving your message. Please try again later.",
      });
  }
});

module.exports = router;
