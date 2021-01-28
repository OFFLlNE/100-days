import React, {useState, useEffect} from "react";

import "./Calculator.scss";
// Styling
// Proper return types

// eslint-disable-next-line
const CALCULATOR_BUTTONS = ["1","2","3","*","4","5","6","/","7","8","9","+","AC","0","=", "-"];
const NUMBER_STRINGS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const MATH_ACTIONS = ["*", "/", "+", "-"];

const Calculator = (): JSX.Element => {
  const [currentInput, setCurrentInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [currentOperation, setCurrentOperation] = useState(undefined);

  const doMath = () => {
    const prevNum = parseFloat(previousInput);
    const currentNum = parseFloat(currentInput);
    if (isNaN(prevNum) || isNaN(currentNum)) return;
    setCurrentOperation(undefined);
    setPreviousInput("");
    setCurrentInput(operatorFunction[currentOperation](prevNum, currentNum));
  };

  const handleNumberInput = (number) => {
    if (typeof currentInput === "string") {
      setCurrentInput(currentInput + number);
    } else {
      // Figure out how I can handle this, happens when I Chain 2*2*2*2
    }
  };

  const handleOperation = (operation) => {
    if (currentInput === "") return;
    if (previousInput !== "") return doMath();
    setPreviousInput(currentInput);
    setCurrentOperation(operation);
    setCurrentInput("");
  };

  const clearAll = () => {
    setCurrentInput("");
    setPreviousInput("");
    setCurrentOperation(undefined);
  };

  const handleActionOnInput = ({variable}) => {
    if (NUMBER_STRINGS.includes(variable)) {
      handleNumberInput(variable);
    }
    if (MATH_ACTIONS.includes(variable)) {
      handleOperation(variable);
    }
    if (variable === "AC") {
      clearAll();
    }
    if (variable === "=") {
      doMath();
    }
  };

  const handleCurrentState = () => {
    console.log("Current state on click is: ", currentInput, previousInput, currentOperation);
  };

  return (
    <>
      <div className="calculator--container">
        <div className="calculator--input-screen">
          <input value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} />
          <input value={previousInput} />
        </div>
        {CALCULATOR_BUTTONS.map((buttonContent) => (
          <CalculatorButton
            key={buttonContent}
            content={buttonContent}
            onButtonClick={(value) => handleActionOnInput({variable: value})}
          />
        ))}
        <button type="button" onClick={() => handleCurrentState()}>
          Click me for STate
        </button>
      </div>
    </>
  );
};

const CalculatorButton = (prop: {content: string; onButtonClick: any}): JSX.Element => {
  return (
    <button onClick={() => prop.onButtonClick(prop.content)} className="calculator--button">
      {prop.content}
    </button>
  );
};

const operatorFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
  "": (x, y) => y
};

export default Calculator;
