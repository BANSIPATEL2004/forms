// import React from "react";
// // import Form1 from "./components/Form1";
// // import Form2 from "./components/Form2";
// import Form3 from "./components/Form3";
// // import Form4 from "./components/Form4";

// function App() {
//   return (
//     <div>
//       {/* <Form1 /> */}
//       {/* <Form2 /> */}
//       <Form3 />
//       {/* <Form4 /> */}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Form3 from "./components/Form3";
import Form4 from "./components/Form4";
import "./App.css";

function App() {
  const [activeForm, setActiveForm] = useState("form1");

  const goToNextForm = () => {
    if (activeForm === "form1") setActiveForm("form2");
    else if (activeForm === "form2") setActiveForm("form3");
    else if (activeForm === "form3") setActiveForm("form4");
    else if (activeForm === "form4") alert("✅ All forms completed!");
  };

  const renderForm = () => {
    switch (activeForm) {
      case "form1":
        return <Form1 onNext={goToNextForm} />;
      case "form2":
        return <Form2 onNext={goToNextForm} />;
      case "form3":
        return <Form3 onNext={goToNextForm} />;
      case "form4":
        return <Form4 />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <nav className="form-nav">
        <a
          href="#form1"
          onClick={() => setActiveForm("form1")}
          className={activeForm === "form1" ? "active" : ""}
        >
          Form1
        </a>
        <a
          href="#form2"
          onClick={() => setActiveForm("form2")}
          className={activeForm === "form2" ? "active" : ""}
        >
          Form2
        </a>
        <a
          href="#form3"
          onClick={() => setActiveForm("form3")}
          className={activeForm === "form3" ? "active" : ""}
        >
          Form3
        </a>
        <a
          href="#form4"
          onClick={() => setActiveForm("form4")}
          className={activeForm === "form4" ? "active" : ""}
        >
          Form4
        </a>
      </nav>

      <div className="form-wrapper">{renderForm()}</div>
    </div>
  );
}

export default App;
