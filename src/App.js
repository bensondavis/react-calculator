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
    setInputVal(inputVal.substring(0, inputVal.length - 1));
  }

  function handleKeyDown({ code }) {
    const options = { Enter: handleEval, Escape: allClear };
    if (options[code]) options[code]();
  }

  return (
    <div className="App">
      <div className="calc">
        <h1 className="heading">Calculator.</h1>
        <input
          value={inputVal}
          type="text"
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div>
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
          <Number
            className="clear_all"
            value={"All Clear"}
            onClick={allClear}
          />
          <Number className="clear" value={"<="} onClick={clearLast} />
        </div>
      </div>
    </div>
  );
}

export default App;
