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
      setInputVal("ERROR");
      run = 1;
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

  /*function handleKeyDown(e) {
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
}*/

  function handleAns() {
    const val = getAns();
    if (val !== undefined) {
      setInputVal(inputVal + val);
    }
  }
  
  return (
    <div className="App">
      <h1 className="details">
        <strong>Calculator</strong>
      </h1>
      <p className="details">v{packageJson.version}</p>
      <div>
        <input value={inputVal} type="text" placeholder="0" />
        <Number className="clear " value={"<="} onClick={clearLast} />
      </div>
      <div id="numpad" className="keys">
        <Number
          className="numbers button_color"
          value={"7"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"8"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"9"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"4"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"5"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"6"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"1"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"2"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"3"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"0"}
          onClick={numberClickHandler}
        />
        <Number
          className="numbers button_color"
          value={"."}
          onClick={numberClickHandler}
        />
        <Number
          className="equals button_color"
          value={"="}
          onClick={handleEval}
        />
      </div>
      <div id="ops" className="keys">
        <div className="parenthesis">
          <Number
            className="parenthesis_l button_color"
            value={"("}
            onClick={numberClickHandler}
          />
          <Number
            className="parenthesis_r button_color"
            value={")"}
            onClick={numberClickHandler}
          />
          <Number
            className="power button_color"
            value={"^"}
            onClick={numberClickHandler}
          />
        </div>
        <div className="symbols">
          <Number
            className="plus button_color"
            value={"+"}
            onClick={numberClickHandler}
          />
          <Number
            className="minus button_color"
            value={"-"}
            onClick={numberClickHandler}
          />
          <Number
            className="undo button_color"
            value={"Undo"}
            onClick={handleUndo}
          />
        </div>
        <div className="symbols">
          <Number
            className="product button_color"
            value={"*"}
            onClick={numberClickHandler}
          />
          <Number
            className="division button_color"
            value={"/"}
            onClick={numberClickHandler}
          />
          <Number
            className="redo button_color"
            value={"Redo"}
            onClick={handleRedo}
          />
        </div>

        <div className="symbols">
          <Number
            className="ans button_color"
            value={"Ans"}
            onClick={handleAns}
          />

          <Number
            className="clear_all button_color"
            value={"All Clear"}
            onClick={allClear}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
