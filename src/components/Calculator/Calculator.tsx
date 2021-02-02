import React, { useState, useEffect } from 'react';

import './Calculator.scss';
// Avoid letter input
// Add operator to previousInput
// Add tests, started with that: https://jestjs.io/docs/en/tutorial-react

// eslint-disable-next-line
const CALCULATOR_BUTTONS = ["1","2","3","*","4","5","6","/","7","8","9","+","AC","0","=", "-"];
const NUMBER_STRINGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const MATH_ACTIONS = ['*', '/', '+', '-'];

const Calculator = (): JSX.Element => {
  const [currentInput, setCurrentInput] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [currentOperation, setCurrentOperation] = useState(undefined);

  const doMath = ({ operation }) => {
    const prevNum = parseFloat(previousInput);
    const currentNum = parseFloat(currentInput);
    if (isNaN(prevNum) || isNaN(currentNum)) return;

    setCurrentOperation(operation);
    setPreviousInput('');
    setCurrentInput(operatorFunction[currentOperation](prevNum, currentNum));
  };

  const handleNumberInput = (number) => {
    if (typeof currentInput === 'string') {
      setCurrentInput(currentInput + number);
    } else {
      setPreviousInput(currentInput + '');
      setCurrentInput(number);
    }
  };

  const handleOperation = (operation) => {
    if (currentInput === '') return;
    if (previousInput !== '') return doMath({ operation });

    setPreviousInput(currentInput);
    setCurrentOperation(operation);
    setCurrentInput('');
  };

  const clearAll = () => {
    setCurrentInput('');
    setPreviousInput('');
    setCurrentOperation(undefined);
  };

  const handleActionOnInput = ({ variable }) => {
    if (NUMBER_STRINGS.includes(variable)) {
      handleNumberInput(variable);
    }
    if (MATH_ACTIONS.includes(variable)) {
      handleOperation(variable);
    }
    if (variable === 'AC') {
      clearAll();
    }
    if (variable === '=') {
      doMath({ operation: variable });
    }
  };

  return (
    <div className="calculator">
      <div className="calculator--container">
        <div className="calculator--input-screen">
          <input className="calculator--input-previous-value" value={previousInput} />
          <input
            className="calculator--input-current-value"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
          />
        </div>
        {CALCULATOR_BUTTONS.map((buttonContent) => (
          <CalculatorButton
            key={buttonContent}
            content={buttonContent}
            onButtonClick={(value) => handleActionOnInput({ variable: value })}
          />
        ))}
      </div>
    </div>
  );
};

const CalculatorButton = (prop: { content: string; onButtonClick: any }): JSX.Element => {
  return (
    <button onClick={() => prop.onButtonClick(prop.content)} className="calculator--button">
      {prop.content}
    </button>
  );
};

const operatorFunction = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '=': (x, y) => y,
};

export default Calculator;
