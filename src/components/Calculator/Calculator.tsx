import React, {useState} from "react";

import "./Calculator.scss";

// Click on number adds number to input
// Allow manually typing input

// Can I do it without using state? Hooks?
// Add parenthesis support?
// Add random number generator?

// Styling

// eslint-disable-next-line
const CALCULATOR_BUTTONS = ["1","2","3","*","4","5","6","/","7","8","9","+","AC","0","=", "-"];
const NUMBER_STRINGS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const MATH_ACTIONS = ["*", "/", "+", "-"];

const Calculator = (): JSX.Element => {
  const [input, setInput] = useState("");
  const [previousInput, setPreviousInput] = useState(null);
  const [currentOperator, setCurrentOperator] = useState(null);

  const doMath = () => {
    const prev = parseFloat(previousInput);
    const current = parseFloat(input);
    if (isNaN(prev) || isNaN(current)) return;
    setInput(operatorFunction[currentOperator](prev, current));
    setCurrentOperator(null);
    setPreviousInput(null);
  };

  const handleActionOnInput = ({variable}) => {
    if (NUMBER_STRINGS.includes(variable)) {
      if (currentOperator === "=") {
        setInput(variable);
        setCurrentOperator(null);
      } else {
        setInput(input + variable);
      }
    }
    if (MATH_ACTIONS.includes(variable)) {
      if (input === "") return;
      if (previousInput !== null) {
        console.log("I am about to do math");

        doMath();
        return;
      }
      setPreviousInput(parseFloat(input));
      setInput("");
      setCurrentOperator(variable);
    }
    if (variable === "AC") {
      setPreviousInput(null);
      setInput("");
      setCurrentOperator(null);
    }
    if (variable === "=") {
      doMath();
    }

    // Display some values that happen inbetween
    // Figure out when doing 2*2*2*2 stuff. Maybe I need to introduce value state as well
  };

  const handleCurrentState = () => {
    console.log("Current state on click is: ", input, previousInput, currentOperator);
  };

  return (
    <>
      <div className="calculator--container">
        <div className="calculator--input-screen">
          <input value={input} />
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
// Change any to actual type
const CalculatorButton = (prop: {content: string; onButtonClick: any}): JSX.Element => {
  return (
    <button onClick={() => prop.onButtonClick(prop.content)} className="calculator--button">
      {prop.content}
    </button>
  );
};

function checkIfNumber(toBeChecked) {
  return toBeChecked === typeof "number";
}

// Click on symbol
// if there is numberMemory
//// return numbermemory (symbol) newNumber
// if symbol === "="
//// return numberMemory currentOperator newNumber
// return {newNumber, symbolAction}
// Clear the current input

const operatorFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
  "": (x, y) => y
};

export default Calculator;
