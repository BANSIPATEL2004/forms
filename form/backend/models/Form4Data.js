const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const form4Schema = new mongoose.Schema({
  email: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("Form4Data", form4Schema);
