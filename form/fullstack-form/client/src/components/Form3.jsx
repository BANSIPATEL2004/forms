import React, { useState } from "react";
import axios from "axios";
import "./Form3.css";

const Form3 = ({ onNext }) => {
  const [step, setStep] = useState(1);
  // const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    childName: "",
    dob: "",
    completedBy: "",
    relationship: "",
    communication: {
      q1: {
        question:
          "1. Delay in, or total lack of, the development of spoken language",
        answers: [],
      },
      q2: { question: "2. Difficulty holding conversation", answers: [] },
      q3: { question: "3. Unusual or repetitive language", answers: [] },
      q4: {
        question: "4. Play that is not developmentally appropriate",
        answers: [],
      },
    },
    communicationComments: "",
    repetitiveBehavior: {
      q1: {
        question: "1. Interests that are narrow in focus, intense, or unusual",
        answers: [],
      },
      q2: {
        question: "2. Unreasonable insistence on sameness/routines",
        answers: [],
      },
      q3: { question: "3. Repetitive motor mannerisms", answers: [] },
      q4: { question: "4. Preoccupation with parts of objects", answers: [] },
    },
    repetitiveBehaviorComments: "",
    socialSkills: {
      q1: {
        question: "1. Lack of Social or emotional reciprocity",
        answers: [],
      },
      q2: {
        question:
          "2. Difficulty using nonverbal behaviors to regulate social interaction",
        answers: [],
      },
      q3: {
        question:
          "3. Little sharing of pleasure, achievements, or interests with others",
        answers: [],
      },
      q4: {
        question: "4. Failure to develop age-appropriate peer relationships",
        answers: [],
      },
    },
    socialSkillsComments: "",
    associatedConcerns: {
      q1: {
        question: "1. Unusual sensory interests",
        answers: [],
      },
      q2: {
        question: "2. Unusual responses to sensory input",
        answers: [],
      },
      q3: {
        question: "3. Delayed motor skills",
        answers: [],
      },
    },
    associatedConcernsComments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (sectionKey, questionKey, optionText) => {
    setFormData((prev) => {
      const currentAnswers = prev[sectionKey][questionKey].answers;
      const updatedAnswers = currentAnswers.includes(optionText)
        ? currentAnswers.filter((ans) => ans !== optionText) // remove if already exists
        : [...currentAnswers, optionText]; // add if not present

      return {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [questionKey]: {
            ...prev[sectionKey][questionKey],
            answers: updatedAnswers,
          },
        },
      };
    });
  };

  const handleNext = () => {
    if (step === 1) {
      const { email, childName, dob, completedBy, relationship } = formData;
      if (!email || !childName || !dob || !completedBy || !relationship) {
        alert("❗ Please fill in all required general information fields.");
        return;
      }
    }

    if (step === 2) {
      const communication = formData.communication;
      for (const key in communication) {
        if (
          !communication[key].answers ||
          communication[key].answers.length === 0
        ) {
          alert("❗ Please answer all Communication questions.");
          return;
        }
      }
    }

    if (step === 3) {
      const repetitiveBehavior = formData.repetitiveBehavior;
      for (const key in repetitiveBehavior) {
        if (
          !repetitiveBehavior[key].answers ||
          repetitiveBehavior[key].answers.length === 0
        ) {
          alert("❗ Please answer all Repetitive Behavior questions.");
          return;
        }
      }
    }

    if (step === 4) {
      const socialSkills = formData.socialSkills;
      for (const key in socialSkills) {
        if (
          !socialSkills[key].answers ||
          socialSkills[key].answers.length === 0
        ) {
          alert("❗ Please answer all Social Skills questions.");
          return;
        }
      }
    }

    if (step === 5) {
      const associatedConcerns = formData.associatedConcerns;
      for (const key in associatedConcerns) {
        if (
          !associatedConcerns[key].answers ||
          associatedConcerns[key].answers.length === 0
        ) {
          alert("❗ Please answer all Associated Concerns questions.");
          return;
        }
      }
      handleSubmit(); // Submit only at last step
      return;
    }

    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate general info
    const { email, childName, dob, completedBy, relationship } = formData;
    if (!email || !childName || !dob || !completedBy || !relationship) {
      alert("❗ Please fill in all required general information fields.");
      return;
    }

    // ✅ Validate grouped question answers
    const sections = [
      "communication",
      "repetitiveBehavior",
      "socialSkills",
      "associatedConcerns",
    ];
    for (const section of sections) {
      const questions = formData[section];
      for (const key in questions) {
        const answers = questions[key].answers;
        if (!answers || answers.length === 0) {
          alert(`❗ Please answer all questions in the "${section}" section.`);
          return;
        }
      }
    }

    // ✅ Submit if everything is valid
    try {
      const response = await axios.post(
        "https://backend-forms-g8v3.onrender.com/api/form3",
        formData
      );
      console.log("✅ Form submitted:", response.data);
      // setSubmitted(true);
      setStep(1);

      // Optional: Reset formData (clear user input)
      setFormData({
        email: "",
        childName: "",
        dob: "",
        completedBy: "",
        relationship: "",
        communication: {
          q1: { question: formData.communication.q1.question, answers: [] },
          q2: { question: formData.communication.q2.question, answers: [] },
          q3: { question: formData.communication.q3.question, answers: [] },
          q4: { question: formData.communication.q4.question, answers: [] },
        },
        communicationComments: "",
        repetitiveBehavior: {
          q1: {
            question: formData.repetitiveBehavior.q1.question,
            answers: [],
          },
          q2: {
            question: formData.repetitiveBehavior.q2.question,
            answers: [],
          },
          q3: {
            question: formData.repetitiveBehavior.q3.question,
            answers: [],
          },
          q4: {
            question: formData.repetitiveBehavior.q4.question,
            answers: [],
          },
        },
        repetitiveBehaviorComments: "",
        socialSkills: {
          q1: { question: formData.socialSkills.q1.question, answers: [] },
          q2: { question: formData.socialSkills.q2.question, answers: [] },
          q3: { question: formData.socialSkills.q3.question, answers: [] },
          q4: { question: formData.socialSkills.q4.question, answers: [] },
        },
        socialSkillsComments: "",
        associatedConcerns: {
          q1: {
            question: formData.associatedConcerns.q1.question,
            answers: [],
          },
          q2: {
            question: formData.associatedConcerns.q2.question,
            answers: [],
          },
          q3: {
            question: formData.associatedConcerns.q3.question,
            answers: [],
          },
        },
        associatedConcernsComments: "",
      });

      // // Auto-clear success message after 5 seconds
      // setTimeout(() => setSubmitted(false), 5000);

      // ✅ Go to next form
      if (onNext) onNext(); //

      // alert("✅ Form submitted successfully!");
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="form3-container">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="form-header">
              <h2>Autism Observation Checklist</h2>
              <p>
                This form is an autism observation checklist used to assess
                behaviors in children related to communication, restricted and
                repetitive behaviors, social skills, sensory interests, motor
                skills, and other concerns associated with autism. It includes
                categories to check off observed behaviors and space for
                comments.
              </p>
            </div>
            {/* {submitted && (
              <p className="success">Form submitted successfully!</p>
            )} */}

            {/* Email First */}
            <input
              type="email"
              name="email"
              className="email-input"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="form-label">
              Child's Name
              <input
                type="text"
                name="childName"
                className="form-input"
                placeholder="Enter child's name"
                value={formData.childName}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Date of Birth
              <input
                type="date"
                name="dob"
                className="form-input"
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // 🔒 Prevent future dates
              />
            </label>

            <label className="form-label">
              Completed By
              <input
                type="text"
                name="completedBy"
                className="form-input"
                placeholder="Your answer"
                value={formData.completedBy}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Relationship to Child
              <select
                name="relationship"
                className="form-select"
                value={formData.relationship}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                <option value="Parent">Parent</option>
                <option value="Teacher">Teacher</option>
                <option value="Childcare Provider">Childcare Provider</option>
                <option value="Medical Provider">Medical Provider</option>
                <option value="OT">OT</option>
                <option value="PT">PT</option>
                <option value="SLP">SLP</option>
                <option value="School Psychologist">School Psychologist</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <div className="form-buttons step1-buttons">
              <button
                type="button"
                className="button-primary"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2 - Communication */}
        {step === 2 && (
          <>
            <h2>Autism Observation Checklist</h2>
            <div className="form-header">
              <h2>Communication</h2>
              <p>
                Please check all items that you have observed with the child &
                you may add comments according to your observation of child.
              </p>
            </div>

            {/* Question 1 */}
            <div className="question">
              <h4>{formData.communication.q1.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q1.answers.includes(
                    "Delay in speaking first words"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q1",
                      "Delay in speaking first words"
                    )
                  }
                />
                Delay in speaking first words
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q1.answers.includes(
                    "Delay in combining words"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q1",
                      "Delay in combining words"
                    )
                  }
                />
                Delay in combining words
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q1.answers.includes(
                    "Delay in current language ability (quantity or quality)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q1",
                      "Delay in current language ability (quantity or quality)"
                    )
                  }
                />
                Delay in current language ability (quantity or quality)
              </label>
            </div>

            {/* Question 2 */}
            <div className="question">
              <h4>{formData.communication.q2.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q2.answers.includes(
                    "Does not make small talk (just to be friendly)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q2",
                      "Does not make small talk (just to be friendly)"
                    )
                  }
                />
                Does not make small talk (just to be friendly)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q2.answers.includes(
                    "Rarely/never initiates conversation"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q2",
                      "Rarely/never initiates conversation"
                    )
                  }
                />
                Rarely/never initiates conversation
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q2.answers.includes(
                    "Difficulty sustaining conversation"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q2",
                      "Difficulty sustaining conversation"
                    )
                  }
                />
                Difficulty sustaining conversation
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q2.answers.includes(
                    "Difficulty discussing topics chosen by another person"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q2",
                      "Difficulty discussing topics chosen by another person"
                    )
                  }
                />
                Difficulty discussing topics chosen by another person
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q2.answers.includes(
                    "Says inappropriate things"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q2",
                      "Says inappropriate things"
                    )
                  }
                />
                Says inappropriate things
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q2.answers.includes(
                    "Doesn’t understand sarcasm/humor"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q2",
                      "Doesn’t understand sarcasm/humor"
                    )
                  }
                />
                Doesn’t understand sarcasm/humor
              </label>
            </div>

            {/* Question 3 */}
            <div className="question">
              <h4>{formData.communication.q3.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q3.answers.includes(
                    "Repeats what others say often (e.g., movies, people, etc.)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q3",
                      "Repeats what others say often (e.g., movies, people, etc.)"
                    )
                  }
                />
                Repeats what others say often (e.g., movies, people, etc.)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q3.answers.includes(
                    "Uses incorrect pronouns (e.g., she instead of I)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q3",
                      "Uses incorrect pronouns (e.g., she instead of I)"
                    )
                  }
                />
                Uses incorrect pronouns (e.g., she instead of I)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q3.answers.includes(
                    "Speaks in an overly formal way"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q3",
                      "Speaks in an overly formal way"
                    )
                  }
                />
                Speaks in an overly formal way
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q3.answers.includes(
                    "Unusual volume, rate, or pitch"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q3",
                      "Unusual volume, rate, or pitch"
                    )
                  }
                />
                Unusual volume, rate, or pitch
              </label>
            </div>

            {/* Question 4 */}
            <div className="question">
              <h4>{formData.communication.q4.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q4.answers.includes(
                    "Doesn’t imitate (e.g., vacuuming, phone, etc.)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q4",
                      "Doesn’t imitate (e.g., vacuuming, phone, etc.)"
                    )
                  }
                />
                Doesn’t imitate (e.g., vacuuming, phone, etc.)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q4.answers.includes(
                    "No/limited pretend play (e.g., doll, action figure, etc.)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q4",
                      "No/limited pretend play (e.g., doll, action figure, etc.)"
                    )
                  }
                />
                No/limited pretend play (e.g., doll, action figure, etc.)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.communication.q4.answers.includes(
                    "No imaginary play (e.g., pretending an object is another, etc.)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "communication",
                      "q4",
                      "No imaginary play (e.g., pretending an object is another, etc.)"
                    )
                  }
                />
                No imaginary play (e.g., pretending an object is another, etc.)
              </label>
            </div>

            {/* Comment Section */}
            <label>
              <strong>Comments</strong>
              <input
                type="text"
                name="communicationComments"
                placeholder="Your answer"
                value={formData.communicationComments || ""}
                onChange={handleChange}
              />
            </label>

            <div className="form-buttons">
              <button
                type="button"
                className="button-primary"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="button-primary"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3 - Repetitive Behavior */}
        {step === 3 && (
          <>
            <h2>Autism Observation Checklist</h2>
            <div className="form-header">
              <h2>Restricted, Repetitive,Stereotyped Behaviors/Movements</h2>
              <p>
                Please check all items that you have observed with the child &
                you may add comments according to your observation of child.
              </p>
            </div>
            {/* Question 1 */}
            <div className="question">
              <h4>{formData.repetitiveBehavior.q1.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q1.answers.includes(
                    "Nonfunctional play with toys"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q1",
                      "Nonfunctional play with toys"
                    )
                  }
                />
                Nonfunctional play with toys (e.g., lining up toys)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q1.answers.includes(
                    "Repeatedly watching movie scenes"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q1",
                      "Repeatedly watching movie scenes"
                    )
                  }
                />
                Repeatedly watching individual scenes in movies
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q1.answers.includes(
                    "Excessive focus on one thing"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q1",
                      "Excessive focus on one thing"
                    )
                  }
                />
                So focused on one thing to the exclusion of others
              </label>
            </div>

            {/* Question 2 */}
            <div className="question">
              <h4>{formData.repetitiveBehavior.q2.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q2.answers.includes(
                    "Rituals in specific order"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q2",
                      "Rituals in specific order"
                    )
                  }
                />
                Rituals/routines that need to be done in a particular way/order
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q2.answers.includes(
                    "Difficulty with routine change"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q2",
                      "Difficulty with routine change"
                    )
                  }
                />
                Difficulty with minor change in routine
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q2.answers.includes(
                    "Upset if objects rearranged"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q2",
                      "Upset if objects rearranged"
                    )
                  }
                />
                Upset if objects are rearranged
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q2.answers.includes(
                    "Difficulty with transitions"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q2",
                      "Difficulty with transitions"
                    )
                  }
                />
                Difficulty with transitions
              </label>
            </div>

            {/* Question 3 */}
            <div className="question">
              <h4>{formData.repetitiveBehavior.q3.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q3.answers.includes(
                    "Hand flapping"
                  )}
                  onChange={() =>
                    handleCheckbox("repetitiveBehavior", "q3", "Hand flapping")
                  }
                />
                Hand flapping or wringing
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q3.answers.includes(
                    "Toe walking"
                  )}
                  onChange={() =>
                    handleCheckbox("repetitiveBehavior", "q3", "Toe walking")
                  }
                />
                Toe walking
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q3.answers.includes(
                    "Head banging"
                  )}
                  onChange={() =>
                    handleCheckbox("repetitiveBehavior", "q3", "Head banging")
                  }
                />
                Head banging
              </label>
            </div>

            {/* Question 4 */}
            <div className="question">
              <h4>{formData.repetitiveBehavior.q4.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q4.answers.includes(
                    "Playing with parts of toys"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "repetitiveBehavior",
                      "q4",
                      "Playing with parts of toys"
                    )
                  }
                />
                Playing with parts of toys (e.g., doors, wheels, strings)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.repetitiveBehavior.q4.answers.includes(
                    "Other"
                  )}
                  onChange={() =>
                    handleCheckbox("repetitiveBehavior", "q4", "Other")
                  }
                />
                Other
              </label>
            </div>

            {/* Comments */}
            <label>
              <strong>Comments</strong>
              <input
                type="text"
                name="repetitiveBehaviorComments"
                placeholder="Your answer"
                value={formData.repetitiveBehaviorComments || ""}
                onChange={handleChange}
              />
            </label>

            <div className="form-buttons">
              <button
                type="button"
                className="button-primary"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="button-primary"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 4 - Social Skills */}
        {step === 4 && (
          <>
            <h2>Autism Observation Checklist</h2>
            <div className="form-header">
              <h2>Social Skills</h2>
              <p>
                Please check all items that you have observed with the child &
                you may add comments according to your observation of child.
              </p>
            </div>
            <div className="question">
              <h4>{formData.socialSkills.q1.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q1.answers.includes(
                    "Doesn’t respond to his/her name"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q1",
                      "Doesn’t respond to his/her name"
                    )
                  }
                />
                Doesn’t respond to his/her name
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q1.answers.includes(
                    "Doesn’t enjoy/seek out social games (e.g.,peek-a-boo)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q1",
                      "Doesn’t enjoy/seek out social games (e.g.,peek-a-boo)"
                    )
                  }
                />
                Doesn’t enjoy/seek out social games (e.g.,peek-a-boo)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q1.answers.includes(
                    "Limited empathy towards others' feelings"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q1",
                      "Limited empathy towards others' feelings"
                    )
                  }
                />
                Limited empathy towards others' feelings
              </label>
            </div>

            <div className="question">
              <h4>{formData.socialSkills.q2.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q2.answers.includes(
                    "Inconsistent eye contact"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q2",
                      "Inconsistent eye contact"
                    )
                  }
                />
                Inconsistent eye contact (unusual quality or coordination)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q2.answers.includes(
                    "Doesn't nod for yes or shake head for no"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q2",
                      "Doesn't nod for yes or shake head for no"
                    )
                  }
                />
                Doesn't nod for yes or shake head for no
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q2.answers.includes(
                    "Doesn’t direct facial expressions towards others"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q2",
                      "Doesn’t direct facial expressions towards others"
                    )
                  }
                />
                Doesn’t direct facial expressions towards others
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q2.answers.includes(
                    "Doesn’t read others’ facial expressions"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q2",
                      "Doesn’t read others’ facial expressions"
                    )
                  }
                />
                Doesn’t read others’ facial expressions (e.g., feelings)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q2.answers.includes(
                    "Doesn’t go to others to be comforted when hurt"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q2",
                      "Doesn’t go to others to be comforted when hurt"
                    )
                  }
                />
                Doesn’t go to others to be comforted when hurt
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q2.answers.includes(
                    "Doesn’t recognize personal space"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q2",
                      "Doesn’t recognize personal space"
                    )
                  }
                />
                Doesn’t recognize personal space
              </label>
            </div>

            <div className="question">
              <h4>{formData.socialSkills.q3.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q3.answers.includes(
                    "Doesn’t point to indicate wants"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q3",
                      "Doesn’t point to indicate wants"
                    )
                  }
                />
                Doesn’t point to indicate wants (e.g., bottle, toys, etc.)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q3.answers.includes(
                    "Doesn’t point to indicate interests"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q3",
                      "Doesn’t point to indicate interests"
                    )
                  }
                />
                Doesn’t point to indicate interests (e.g., plane, dog, etc.)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q3.answers.includes(
                    "Doesn’t share things with others"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q3",
                      "Doesn’t share things with others"
                    )
                  }
                />
                Doesn’t share things with others
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q3.answers.includes(
                    "Isn't interested in praise or compliments"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q3",
                      "Isn't interested in praise or compliments"
                    )
                  }
                />
                Isn't interested in praise or compliments
              </label>
            </div>

            <div className="question">
              <h4>{formData.socialSkills.q4.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q4.answers.includes(
                    "Limited/unusual response to peer initiation"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q4",
                      "Limited/unusual response to peer initiation"
                    )
                  }
                />
                Limited/unusual response to peer initiation
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q4.answers.includes(
                    "Limited/unusual initiation of interactions with peers"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q4",
                      "Limited/unusual initiation of interactions with peers"
                    )
                  }
                />
                Limited/unusual initiation of interactions with peers
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q4.answers.includes(
                    "Prefers to be alone"
                  )}
                  onChange={() =>
                    handleCheckbox("socialSkills", "q4", "Prefers to be alone")
                  }
                />
                Prefers to be alone
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.socialSkills.q4.answers.includes(
                    "Gets along only with much older/younger children"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "socialSkills",
                      "q4",
                      "Gets along only with much older/younger children"
                    )
                  }
                />
                Gets along only with much older/younger children
              </label>
            </div>

            <label>
              <strong>Comments</strong>
              <input
                type="text"
                name="socialSkillsComments"
                placeholder="Your answer"
                value={formData.socialSkillsComments || ""}
                onChange={handleChange}
              />
            </label>

            <div className="form-buttons">
              <button
                type="button"
                className="button-primary"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="button-primary"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 5 - Associated Concerns */}
        {step === 5 && (
          <>
            <h2>Autism Observation Checklist</h2>
            <div className="form-header">
              <h2>Associated Concerns</h2>
              <p>
                Please check all items that you have observed with the child &
                you may add comments according to your observation of child.
              </p>
            </div>

            {/* Question 1 */}
            <div className="question">
              <h4>{formData.associatedConcerns.q1.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q1.answers.includes(
                    "Strong sensory preferences (e.g., food textures)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q1",
                      "Strong sensory preferences (e.g., food textures)"
                    )
                  }
                />
                Strong sensory preferences (e.g., food textures)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q1.answers.includes(
                    "Sensory seeking behavior (e.g., excessive smelling or touching)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q1",
                      "Sensory seeking behavior (e.g., excessive smelling or touching)"
                    )
                  }
                />
                Sensory seeking behavior (e.g., excessive smelling or touching)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q1.answers.includes(
                    "Sensory interests rather than toys/games direct activities"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q1",
                      "Sensory interests rather than toys/games direct activities"
                    )
                  }
                />
                Sensory interests rather than toys/games direct activities
              </label>
            </div>

            {/* Question 2 */}
            <div className="question">
              <h4>{formData.associatedConcerns.q2.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q2.answers.includes(
                    "Indifference to pain, heat, or cold"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q2",
                      "Indifference to pain, heat, or cold"
                    )
                  }
                />
                Indifference to pain, heat, or cold
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q2.answers.includes(
                    "Sensitivity to lights or sounds"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q2",
                      "Sensitivity to lights or sounds"
                    )
                  }
                />
                Sensitivity to lights or sounds
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q2.answers.includes(
                    "Irritated by clothing or tactile input"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q2",
                      "Irritated by clothing or tactile input"
                    )
                  }
                />
                Irritated by clothing or tactile input
              </label>
            </div>

            {/* Question 3 */}
            <div className="question">
              <h4>{formData.associatedConcerns.q3.question}</h4>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q3.answers.includes(
                    "Delayed gross motor (e.g., odd gait, poor balance, etc.)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q3",
                      "Delayed gross motor (e.g., odd gait, poor balance, etc.)"
                    )
                  }
                />
                Delayed gross motor (e.g., odd gait, poor balance, etc.)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.associatedConcerns.q3.answers.includes(
                    "Delayed fine motor (e.g., handwriting, buttoning clothes, etc.)"
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "associatedConcerns",
                      "q3",
                      "Delayed fine motor (e.g., handwriting, buttoning clothes, etc.)"
                    )
                  }
                />
                Delayed fine motor (e.g., handwriting, buttoning clothes, etc.)
              </label>
            </div>

            {/* Comments */}
            <label>
              <strong>Comments</strong>
              <input
                type="text"
                name="associatedConcernsComments"
                placeholder="Your answer"
                value={formData.associatedConcernsComments || ""}
                onChange={handleChange}
              />
            </label>

            <div className="form-buttons">
              <button
                type="button"
                className="button-primary"
                onClick={handleBack}
              >
                Back
              </button>
              <button type="submit" className="button-primary">
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Form3;
