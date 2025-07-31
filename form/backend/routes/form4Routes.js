// routes/form4Routes.js
const express = require("express");
const router = express.Router();
const Form4Data = require("../models/Form4Data"); // make sure model exists

router.post("/", async (req, res) => {
  try {
    const newEntry = new Form4Data(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Form 4 data saved!" });
  } catch (error) {
    console.error("Error saving Form 4 data:", error);
    res.status(500).json({ error: "Server error while saving Form 4 data." });
  }
});

module.exports = router;
