import { useState } from "react";
import { Parser } from "expr-eval";

import Number from "./components/Number";

import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");

  function numberClickHandler(value) {
    setInputVal(inputVal + value);
  }

  function handleEval() {
    try {
      const parser = new Parser();
      const exp = parser.parse(inputVal);
      const result = exp.evaluate();
      setInputVal(result);
    } catch (e) {
      alert(`invalid expression : ${e}`);
    }
  }

  function allClear() {
    setInputVal("");
  }

  function clearLast() {
    setInputVal(inputVal.substring(0, inputVal.length - 1))
  }

  return (
    <div className="App">
      <div className="calc">
      <h1 className="p">Calculator</h1>
      <input value={inputVal} type="text" />
      <div>
        {Array(10)
          .fill(1)
          .map((_, i) => (
            <Number className="numbers" key={i} value={i} onClick={numberClickHandler} />
          ))}
        <Number className="numbers" value={"."} onClick={numberClickHandler} />
      </div>
      <div>
        <Number value={"+"} onClick={numberClickHandler} />
        <Number value={"-"} onClick={numberClickHandler} />
        <Number value={"*"} onClick={numberClickHandler} />
        <Number value={"/"} onClick={numberClickHandler} />
        <Number value={"="} onClick={handleEval} />
        <Number value={"All Clear"} onClick={allClear} />
        <Number value={"Clear"} onClick={clearLast} />
      </div>
      </div>
    </div>
  );
}

export default App;
