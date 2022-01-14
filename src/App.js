import { useState } from "react";
import { Parser } from "expr-eval";

import Number from "./components/Number";
import { addAns, addStack, getAns, redo, undo } from "./utility/undo";
import packageJson from "../package.json";

import "./App.css";

let run = 0;
function App() {
  const [inputVal, setInputVal] = useState("");

  function numberClickHandler(value) {
    if (run === 1) {
      run = 0;
      setInputVal(value);
    } else {
      setInputVal(inputVal + value);
    }
  }

  window.onload = () => document.getElementById("input1").focus();

  function handleEval() {
    try {
      const parser = new Parser();
      const exp = parser.parse(inputVal);
      const result = exp.evaluate();
      setInputVal(result);
      addStack(inputVal);
      addAns(result);
      run = 1;
    } catch (e) {
      alert(`invalid expression : ${e}`);
    }
  }

  function allClear() {
    setInputVal("");
  }

  function clearLast() {
    setInputVal(inputVal.substring(0, inputVal.length - 1));
  }

  function handleUndo() {
    const prevVal = undo();
    if (prevVal) {
      setInputVal(prevVal);
    }
  }

  function handleRedo() {
    const currentVal = redo();
    if (currentVal) {
      setInputVal(currentVal);
    }
  }

  function handleKeyDown(e) {
    if (run === 1) {
      run = 0;
      allClear();
    }
    const options = {
      Enter: handleEval,
      Escape: allClear,
    };
    if (options[e.code]) options[e.code]();
    if (e.ctrlKey && e.key === "z") {
      handleUndo();
    }
    if (e.ctrlKey && e.key === "q") {
      handleRedo();
    }
  }

  function handleAns() {
    const val = getAns();
    setInputVal(inputVal + val);
  }

  return (
    <div className="App">
      <div className="calc">
        <div id="details">
          <h1 className="heading">Calculator</h1>
          <p className="version_id">v{packageJson.version}</p>
        </div>
        <div>
          <input
            value={inputVal}
            type="text"
            id="input1"
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {Array(10)
            .fill(1)
            .map((_, i) => (
              <Number
                className="numbers"
                key={i}
                value={i}
                onClick={numberClickHandler}
              />
            ))}
          <Number
            className="numbers"
            value={"."}
            onClick={numberClickHandler}
          />
          <Number className="numbers" value={"="} onClick={handleEval} />
          <Number
            className="symbols"
            value={"+"}
            onClick={numberClickHandler}
          />
          <Number
            className="symbols"
            value={"-"}
            onClick={numberClickHandler}
          />
          <Number
            className="symbols"
            value={"*"}
            onClick={numberClickHandler}
          />

          <Number
            className="symbols"
            value={"/"}
            onClick={numberClickHandler}
          />
          <Number className="undo" value={"Undo"} onClick={handleUndo} />
          <Number className="redo" value={"Redo"} onClick={handleRedo} />
          <Number
            className="clear_all"
            value={"All Clear"}
            onClick={allClear}
          />
          <Number className="clear" value={"<="} onClick={clearLast} />
          <Number className="clear" value={"Ans"} onClick={handleAns} />
        </div>
      </div>
    </div>
  );
}

export default App;
