// routes/form1Routes.js
const express = require("express");
const router = express.Router();
const Form1Data = require("../models/Form1Data");

router.post("/", async (req, res) => {
  try {
    const newForm = new Form1Data(req.body);
    await newForm.save();
    res.status(201).json({ message: "✅ Form1 saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Submission failed" });
  }
});

module.exports = router;
