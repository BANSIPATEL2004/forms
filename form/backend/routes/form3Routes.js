const express = require("express");
const router = express.Router();
const Form3Data = require("../models/Form3Data");

// POST /api/form3
router.post("/", async (req, res) => {
  try {
    const newForm = new Form3Data(req.body);
    await newForm.save();
    res.status(201).json({ message: "Form 3 submitted successfully" });
  } catch (error) {
    console.error("❌ Error saving Form 3:", error);
    res.status(500).json({ error: "Failed to submit Form 3" });
  }
});

module.exports = router;
