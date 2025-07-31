import React, { useState } from "react";
import axios from "axios";
import "./Form2.css";

const Form2 = ({ onNext }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    childName: "",
    childAge: "",
    dob: "",
    informantName: "",
    relationship: "",
    questions: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: "",
      q11: "",
      q12: "",
      q13: "",
      q14: "",
      q15: "",
      q16: "",
      q17: "",
      q18: "",
      q19: "",
      q20: "",
      q21: "",
      q22: "",
      q23: "",
      q24: "",
      q25: "",
      q26: "",
      q27: "",
      q28: "",
      q29: "",
      q30: "",
      q31: "",
      q32: "",
      q33: "",
      q34: "",
      q35: "",
      q36: "",
      q37: "",
      q38: "",
      q39: "",
      q40: "",
    },
  });

  const questionList = [
    "Is she/he now able to talk using short phrases or sentences? ",
    "Do you have a to-and-fro “conversation” with her/him that involves taking turns or building on what you have said ?",
    "Does she/he ever use odd phrases or say the same thing over and over in almost exactly the same way (either phrases that she/he hears other people use or ones that she/he makes up)?",
    "Does she/he ever use socially inappropriate questions or statements? For example, does she/he regularly ask personal questions or make personal comments at awkward times ?",
    "Does she/he ever get her/his pronouns mixed up (e.g. saying you or she/he for I) ?",
    "Does she/he ever use words that she/he seems to have invented or made up herself/himself; put things in odd, indirect ways; or use metaphorical ways of saying things (e.g. saying hot rain for steam)?",
    "Does she/he ever say the same thing over and over in exactly the same way or insist that you say the same thing over and over again?",
    "Does she/he ever have things that she/he seems to have to do in a very particular way or order or rituals that she/he insists that you go through ?",
    "Does her/his facial expression usually seem appropriate to the particular situation, as far as you can tell ?",
    "Does she/he ever use your hand like a tool or as if it were part of her/his own body (e.g. pointing with your finger, putting your hand on a doorknob to get you to open the door) ?",
    "Does she/he ever have any interests that preoccupy her/him and might seem odd to other people (e.g. traffic lights, drainpipes, timetables) ?",
    "Does she/he ever seem to be more interested in parts of a toy or an object (e.g. spinning the wheels of a car), rather than in using the objects as it was intended ?",
    "Does she/he ever have any special interests that are unusual in their intensity but otherwise appropriate for her/his age and peer group (e.g. trains or dinosaurs) ?",
    "Does she/he ever seem to be unusually interested in the sight, feel, sound, taste, or smell of things or people ?",
    "Does she/he ever have any mannerisms or odd ways of moving her/his hands or fingers, such as flapping or moving her/his fingers in front of her/his eyes ?",
    "Does she/he ever have any complicated movements of her/his whole body, such as spinning or repeatedly bouncing up and down?",
    "Does she/he ever injure herself/himself deliberately, such as biting her/his arm or banging her/his head ?",
    "Does she/he ever have any objects (other than a soft toy or comfort blanket) that she/he has to carry around ?",
    "Does she/he ever have any particular friends or a best friend ?",
    "Does she/he ever talk to you just to be friendly (rather than to get something) ?",
    "Does she/he ever spontaneously copy you (or other people) or what you are doing (such as vacuuming, gardening, or mending things) ?",
    "Does she/he ever spontaneously point at things around her/him just to show you things (not because she/he wants them)?",
    "Does she/he ever use gestures, other than pointing or pulling your hand, to let you know what she/he wants ?",
    "Does she/he nod her/his head to indicate yes ?",
    "Does she/he shake her/his head to indicate no ?",
    "Does she/he usually look at you directly in the face when doing things with you or talking with you ?",
    "Does she/he smile back if someone smiles at her/him ?",
    "Does she/he ever show you things that interest her/him to engage your attention ?",
    "Does she/he ever offer to share things other than food with you?",
    "Does she/he ever seem to want you to join in her/his enjoyment of something ?",
    "Does she/he ever try to comfort you if you are sad or hurt ?",
    "If she/he wants something or wants help, does she/he look at you and use gestures with sounds or words to get your attention ?",
    "Does she/he show a normal range of facial expressions ?",
    "Does she/he ever spontaneously join in and try to copy the actions in social games, such as The Mulberry Bush or London Bridge Is Falling Down ?",
    "Does she/he play any pretend or make-believe games ?",
    "Does she/he seem interested in other children of approximately the same age whom she/he does not know ?",
    "Does she/he respond positively when another child approaches her/him ?",
    "If you come into a room and start talking to her/him without calling her/his name, does she/he usually look up and pay attention to you ?",
    "Does she/he ever play imaginative games with another child in such a way that you can tell that each child understands what the other is pretending ?",
    "Does she/he play cooperatively in games that need some form of joining in with a group of other children, such as hide-and-seek or ball games ?",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("q")) {
      setFormData((prev) => ({
        ...prev,
        questions: {
          ...prev.questions,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate answers
    const unanswered = questionList.some(
      (_, index) => !formData.questions[`q${index + 1}`]
    );
    if (
      !formData.email ||
      !formData.childName ||
      !formData.childAge ||
      !formData.dob ||
      !formData.informantName ||
      !formData.relationship ||
      unanswered
    ) {
      alert("❗ Please answer all questions and fill required fields.");
      return;
    }

    // ✅ Format questions
    const formattedQuestions = {};
    questionList.forEach((questionText, index) => {
      const key = `q${index + 1}`;
      formattedQuestions[key] = {
        question: questionText,
        answer: formData.questions[key],
      };
    });

    const finalPayload = {
      ...formData,
      questions: formattedQuestions,
    };

    try {
      await axios.post("http://localhost:5000/api/form2", finalPayload);
      setSubmitted(true);
      setStep(1);

      // ✅ Auto-reset form and go to step 1 after 3s

      setFormData({
        email: "",
        childName: "",
        childAge: "",
        dob: "",
        informantName: "",
        relationship: "",
        questions: Object.fromEntries(
          Array.from({ length: 40 }, (_, i) => [`q${i + 1}`, ""])
        ),
      });
      setSubmitted(false);
      setStep(1);

      // ✅ Move to next form
      if (onNext) onNext();
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form2-container">
      <form onSubmit={handleSubmit}>
        {/* Step 1 – Personal Info */}
        {step === 1 && (
          <>
            <div className="form-header">
              <h1>Social Communication Questionnaire</h1>
              <p>
                The Social Communication Questionnaire (SCQ) is a 40-item
                screening tool completed by caregivers to help identify children
                at risk of Autism Spectrum Disorder.
              </p>
            </div>

            {/* {submitted && (
              <p className="success">Form submitted successfully!</p>
            )} */}

            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              className="email-input"
              required
            />
            <label className="form-label">
              Child's Name:
              <input
                type="text"
                name="childName"
                placeholder="Child's Name"
                value={formData.childName}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Child's Age:
              <input
                type="text"
                name="childAge"
                placeholder="Child's Age"
                value={formData.childAge}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Child's DOB :
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-input"
                max={new Date().toISOString().split("T")[0]}
              />
            </label>
            <label className="form-label">
              Informant's Name :
              <input
                type="text"
                name="informantName"
                placeholder="Informant's Name"
                value={formData.informantName}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Relationship to Child
              <input
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="form-input underline-input"
                placeholder="e.g., Parent, Guardian"
              />
            </label>

            <div className="form-buttons single-button">
              <button
                type="button"
                onClick={() => {
                  if (
                    !formData.email ||
                    !formData.childName ||
                    !formData.childAge ||
                    !formData.dob ||
                    !formData.informantName ||
                    !formData.relationship
                  ) {
                    alert(
                      "❗ Please fill in all required fields before proceeding."
                    );
                    return;
                  }
                  setStep(2);
                }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2 – Questions */}
        {step === 2 && (
          <>
            <div className="form-header">
              <h1>Social Communication Questionnaire</h1>
              <p>
                Please answer each question with a YES or NO. Make sure to think
                about your answers based on your observations from the last
                three months.
              </p>
            </div>

            {questionList.map((question, index) => {
              const key = `q${index + 1}`;
              return (
                <div key={key} className="question-block">
                  <label>{`${index + 1}. ${question}`}</label>
                  <div className="options">
                    <label>
                      <input
                        type="radio"
                        name={key}
                        value="Yes"
                        checked={formData.questions[key] === "Yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={key}
                        value="No"
                        checked={formData.questions[key] === "No"}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              );
            })}

            <div className="form-buttons">
              <button type="button" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit">Submit</button>
            </div>
          </>
        )}

        {submitted && <p className="success">Form submitted successfully!</p>}
      </form>
    </div>
  );
};

export default Form2;
