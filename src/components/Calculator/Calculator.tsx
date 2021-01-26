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

const Calculator = (): JSX.Element => {
  const [input, setInput] = useState("");
  const [numberMemory, setNumberMemory] = useState(null);
  const [currentOperator, setCurrentOperator] = useState(null);

  const handleActionOnInput = ({variable}) => {
    if (NUMBER_STRINGS.includes(variable)) return setInput(input + variable);
    console.log("Input here? ", input);

    setNumberMemory(parseFloat(input));
    setInput("");
    const symbol = variable;
    // For some reason log seems to happen too fast that the state is not updated yet
    console.log("Symbol and saved input: ", symbol, numberMemory);

    // if (prevNumber) return operatorFunction[symbol](prevNumber, newNumber);
    // if (symbol === "=") return operatorFunction[currentOperator](prevNumber, newNumber);
    // switch (symbol) {
    //   case "/": {
    //     return prevNumber / newNumber;
    //   }
    //   case "*": {
    //     return prevNumber * newNumber;
    //   }
    //   case "+": {
    //     return prevNumber + newNumber;
    //   }
    //   case "-": {
    //     return prevNumber - newNumber;
    //   }
    //   case "AC": {
    //     return 0;
    //   }
    //   default: {
    //     return 1;
    //   }
    // }
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
