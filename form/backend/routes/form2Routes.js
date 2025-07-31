const express = require("express");
const router = express.Router();
const Form2Data = require("../models/Form2Data");

router.post("/", async (req, res) => {
  try {
    const {
      email,
      childName,
      childAge,
      dob,
      informantName,
      relationship,
      questions,
    } = req.body;

    const newForm = new Form2Data({
      email,
      childName,
      childAge,
      dob,
      informantName,
      relationship,
      questions,
    });

    await newForm.save();
    res.status(200).json({ message: "✅ Form submitted successfully" });
  } catch (error) {
    console.error("❌ Error saving form2 data:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
