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

const Calculator = (): JSX.Element => {
  const [input, setInput] = useState("");

  return (
    <>
      <div className="calculator--container">
        <div className="calculator--input-screen">
          <input value={input} />
        </div>
        {CALCULATOR_BUTTONS.map((buttonContent) => (
          <CalculatorButton key={buttonContent} content={buttonContent} onButtonClick={setInput} />
        ))}
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

export default Calculator;
