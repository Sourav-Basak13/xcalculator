import { useState } from "react";
import "./App.css";
import { evaluateInfix } from "./lib/functions/_helper";

function App() {
  const [result, setResult] = useState(0);
  const [inputStr, setInputStr] = useState("");

  const handleBtnClick = (char) => {
    switch (char) {
      case "=":
        setResult(evaluateInfix(inputStr));
        break;
      case "C":
        setInputStr("");
        setResult(0);
        break;
      default:
        setInputStr((prev) => `${prev}${char}`);
    }
  };
  return (
    <div
      style={{
        width: "400px",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>React Calculator</h1>
      <input type="text" name="calculator_input" value={inputStr} />
      <p className="cal_result">{result}</p>
      <span className="btn_wrapper">
        {[7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "*", "C", 0, "=", "/"].map(
          (_ele) => (
            <button
              className="cal_btn"
              key={_ele}
              onClick={() => handleBtnClick(_ele)}
            >
              {_ele}
            </button>
          )
        )}
      </span>
    </div>
  );
}

export default App;
