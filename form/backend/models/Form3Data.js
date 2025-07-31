const mongoose = require("mongoose");

const questionGroupSchema = new mongoose.Schema({
  question: String,
  answers: [String],
});

const form3Schema = new mongoose.Schema({
  email: { type: String, required: true },
  childName: String,
  dob: String,
  completedBy: String,
  relationship: String,

  communication: {
    q1: questionGroupSchema,
    q2: questionGroupSchema,
    q3: questionGroupSchema,
    q4: questionGroupSchema,
  },
  communicationComments: String,

  repetitiveBehavior: {
    q1: questionGroupSchema,
    q2: questionGroupSchema,
    q3: questionGroupSchema,
    q4: questionGroupSchema,
  },
  repetitiveBehaviorComments: String,

  socialSkills: {
    q1: questionGroupSchema,
    q2: questionGroupSchema,
    q3: questionGroupSchema,
    q4: questionGroupSchema,
  },
  socialSkillsComments: String,

  associatedConcerns: {
    q1: questionGroupSchema,
    q2: questionGroupSchema,
    q3: questionGroupSchema,
  },
  associatedConcernsComments: String,
});

module.exports = mongoose.model("Form3Data", form3Schema);
