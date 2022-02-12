import { useState } from "react";
import { Parser } from "expr-eval";

import Number from "./components/Number";
import { addAns, addStack, getAns, redo, undo } from "./utility/undo";
import packageJson from "../package.json";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Divider } from "@mui/material";

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

  function handleAns() {
    const val = getAns();
    if (val !== undefined) {
      setInputVal(inputVal + val);
    }
  }

  return (
    <Box
      sx={{
        minWidth: 438.67,
        width: "50%",
        height: 400,
        borderRadius: "10px",
        m: "50px auto",
      }}
      border={1}
      borderColor="primary.main"
    >
      <h1 className="details">
        <strong>Calculator</strong>
      </h1>
      <p className="details">v{packageJson.version}</p>

      <FormControl
        sx={{ width: "100%", p: 1, mt: 2, mb: 1}}
        variant="outlined"
      >
        <OutlinedInput
          id="outlined-adornment-password"
          type={"text"}
          value={inputVal}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={clearLast} edge="end">
                <BackspaceIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Box display="flex" sx={{ width: "100%" }}>
        <Box sx={{ width: "50%", p: 1 }}>
          <Number
            className="numbers"
            value={"7"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"8"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"9"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"4"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"5"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"6"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"1"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"2"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"3"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"0"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"."}
            onClick={numberClickHandler}
          />

          <Number className="numbers" value={"="} onClick={handleEval} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: "50%", p: 1 }}>
          <Number
            className="numbers"
            value={"("}
            onClick={numberClickHandler}
          />
          <Number
            className="numbers"
            value={")"}
            onClick={numberClickHandler}
          />
          <Number
            className="numbers"
            value={"^"}
            onClick={numberClickHandler}
          />

          <Number
            className="numbers"
            value={"+"}
            onClick={numberClickHandler}
          />
          <Number
            className="numbers"
            value={"-"}
            onClick={numberClickHandler}
          />
          <Number className="numbers" value={"Undo"} onClick={handleUndo} />

          <Number
            className="numbers"
            value={"*"}
            onClick={numberClickHandler}
          />
          <Number
            className="numbers"
            value={"/"}
            onClick={numberClickHandler}
          />
          <Number className="numbers" value={"Redo"} onClick={handleRedo} />

          <Number className="numbers" value={"Ans"} onClick={handleAns} />

          <Number className="numbers" value={"All Clear"} onClick={allClear} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
