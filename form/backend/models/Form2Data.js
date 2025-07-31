const mongoose = require("mongoose");

const form2Schema = new mongoose.Schema({
  email: { type: String, required: true },
  childName: String,
  childAge: String,
  dob: String,
  informantName: String,
  relationship: String,

  // ✅ Store questions as a flat object instead of array
  questions: {
    type: Object,
    required: true,
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Form2Data", form2Schema);
