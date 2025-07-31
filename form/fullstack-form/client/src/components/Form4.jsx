import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Form1.css";

function Form4() {
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
  });

  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const questions = [
    "Does s/he join in playing games with other children easily?",
    "Does s/he come up to you spontaneously for a chat?",
    "Was s/he speaking by 2 years old?",
    "Does s/he enjoy sports?",
    "Is it important to him/her to fit in with the peer group?",
    "Does s/he appear to notice unusual details that others miss?",
    "Does s/he tend to take things literally?",
    "When s/he was 3 years old, did s/he spend a lot of time pretending (e.g., play-acting being a superhero, or holding teddy's tea parties)?",
    "Does s/he like to do things over and over again, in the same way all the time?",
    "Does s/he find it easy to interact with other children?",
    "Can s/he keep a two-way conversation going?",
    "Can s/he read appropriately for his/her age?",
    "Does s/he mostly have the same interests as his/her peers?",
    "Does s/he have an interest which takes up so much time that s/he does little else?",
    "Does s/he have friends, rather than just acquaintances?",
    "Does s/he often bring you things s/he is interested in to show you?",
    "Does s/he enjoy joking around?",
    "Does s/he have difficulty understanding the rules for polite behavior?",
    "Does s/he appear to have an unusual memory for details?",
    "Is his/her voice unusual (e.g., overly adult, flat, or very monotonous)?",
    "Are people important to him/her?",
    "Can s/he dress him/herself?",
    "Is s/he good at turn-taking in conversation?",
    "Does s/he play imaginatively with other children, and engage in role-play?",
    "Does s/he often do or say things that are tactless or socially inappropriate?",
    "Can s/he count to 50 without leaving out any numbers?",
    "Does s/he make normal eye-contact?",
    "Does s/he have any unusual and repetitive movements?",
    "Is his/her social behavior very one-sided and always on his/her own terms?",
    "Does s/he sometimes say “you” or “s/he” when s/he means “I”?",
    "Does s/he prefer imaginative activities such as play-acting or story-telling, rather than numbers or lists of facts?",
    "Does s/he sometimes lose the listener because of not explaining what s/he is talking about?",
    "Can s/he ride a bicycle (even if with stabilizers)?",
    "Does s/he try to impose routines on him/herself, or on others, in such a way that it causes problems?",
    "Does s/he care how s/he is perceived by the rest of the group?",
    "Does s/he often turn conversations to his/her favorite subject rather than following what the other person wants to talk about?",
    "Does s/he have odd or unusual phrases?",
    " Have teachers/health visitors ever expressed any concerns about his/her development?",
    "Has s/he ever been diagnosed with any of the following: Language delay, ADHD, hearing or visual difficulties, Autism Spectrum Condition (including Asperger’s Syndrome, or a physical disability?",
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
        "http://localhost:5000/api/form4",
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
        });
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
          <h1>The Childhood Autism Spectrum Test (CAST)</h1>
          <p>
            The Childhood Autism Spectrum Test (CAST), formerly known as the
            Childhood Asperger Syndrome Test, is a tool designed for the early
            detection of Autism Spectrum Disorder (ASD) in children aged 4 to 11
            years. It is structured as a parent-completed questionnaire,
            focusing on behaviors and abilities that are indicative of ASD. By
            capturing a wide range of social, communicative, and imaginative
            behaviors, the CAST aims to identify children who may benefit from a
            more detailed evaluation for ASD. This screening tool is
            particularly notable for its role in facilitating early
            identification of ASD, thereby enabling timely intervention and
            support.
          </p>
        </div>

        {submitted && <p className="success">Form submitted successfully!</p>}

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
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`q${index + 1}`}
                    value="No"
                    checked={formData[`q${index + 1}`] === "No"}
                    onChange={handleChange}
                  />
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

export default Form4;
