import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Form1.css";

function Form({ onNext }) {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
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
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const questions = [
    "If you point at something across the room, does your child look at it?(For Example, if you point at a toy or an animal, does your child look at the toy or animal?)",
    "Have you ever wondered if your child might be deaf?",
    "Does your child play pretend or make-believe?(For Example, pretend to drink from an empty cup, pretend to talk on a phone, or pretend to feed a doll or stuffed animal?)",
    "Does your child like climbing on things?(For Example, furniture, playground equipment, or stairs)",
    "Does your child make unusual finger movements near his or her eyes?(For Example, does your child wiggle his or her fingers close to his or her eyes?)",
    "Does your child point with one finger to ask for something or to get help?(For Example, pointing to a snack or toy that is out of reach)",
    "Does your child point with one finger to show you something interesting?(For Example, pointing to an airplane in the sky or a big truck in the road)",
    "Is your child interested in other children?(For Example, does your child watch other children, smile at them, or go to them?)",
    "Does your child show you things by bringing them to you or holding them up for you to see — not to get help, but just to share?(For Example, showing you a flower, a stuffed animal, or a toy truck)",
    "Does your child respond when you call his or her name?(For Example, does he or she look up, talk or babble, or stop what he or she is doing when you call his or her name?)",
    "When you smile at your child, does he or she smile back at you ?",
    "Does your child get upset by everyday noises?(For Example, does your child scream or cry to noise such as a vacuum cleaner or loud music?)",
    "Does your child walk?",
    "Does your child look you in the eye when you are talking to him or her, playing with him or her, or dressing him or her?",
    "Does your child try to copy what you do?(For Example, wave bye-bye, clap, or make a funny noise when you do)",
    "If you turn your head to look at something, does your child look around to see what you are looking at?",
    "Does your child try to get you to watch him or her?(For Example, does your child look at you for praise, or say “look” or “watch me”?)",
    "Does your child understand when you tell him or her to do something?(For Example, if you don't point, can your child understand “put the book on the chair” or “bring me the blanket”?",
    "If something new happens, does your child look at your face to see how you feel about it?(For Example, if he or she hears a strange or funny noise, or sees a new toy, will he or she look at your face?)",
    "Does your child like movement activities?(For Example, being swung or bounced on your knee)",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate before sending
    if (
      !formData.email ||
      questions.some((_, index) => !formData[`q${index + 1}`])
    ) {
      alert("❗ Please answer all questions before submitting.");
      return;
    }

    const questionData = questions.map((questionText, index) => ({
      question: questionText,
      answer: formData[`q${index + 1}`],
    }));

    const dataToSend = {
      email: formData.email,
      questions: questionData,
    };

    try {
      const res = await axios.post(
        "https://backend-forms-g8v3.onrender.com/api/form1",
        dataToSend
      );

      if (res.status === 200 || res.status === 201) {
        //  Scroll to top smoothly
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: "smooth" });
        }

        setSubmitted(true);
        setFormData({
          email: "",
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
        });

        // ✅ Move to next form
        if (onNext) onNext();
      }
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("Form submission failed.");
    }
  };

  return (
    <div className="container-wrapper">
      <div className="container" ref={formRef}>
        <div className="form-header">
          <h1>M-CHART-R</h1>
          <p>
            The Modified Checklist for Autism in Toddlers, Revised (M-CHAT-R) is
            a screener that will ask a series of 20 questions about your child’s
            behavior. It's intended for toddlers between 16 and 30 months of
            age. The results will let you know if a further evaluation may be
            needed. You can use the results of the screener to discuss any
            concerns that you may have with your child’s healthcare provider.
          </p>
        </div>

        {/* {submitted && <p className="success">Form submitted successfully!</p>} */}

        <form onSubmit={handleSubmit}>
          {/* Email First */}
          <input
            type="email"
            name="email"
            className="email-input"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Questions */}
          {questions.map((text, index) => (
            <div className="question" key={index}>
              <div className="question-label">
                <span className="question-number">{index + 1}.</span>
                <span className="question-text">{text}</span>
              </div>

              <div className="options">
                <label>
                  <input
                    type="radio"
                    name={`q${index + 1}`}
                    value="Yes"
                    checked={formData[`q${index + 1}`] === "Yes"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`q${index + 1}`}
                    value="No"
                    checked={formData[`q${index + 1}`] === "No"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
