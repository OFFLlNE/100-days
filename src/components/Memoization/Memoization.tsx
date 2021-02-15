import React, { useState } from 'react';

import './Memoization.scss';

const Memoization = (): JSX.Element => {
  const [classicTime, setClassicTime] = useState(0);
  const [memoizationTime, setMemoizationTime] = useState(0);
  const [number, setNumber] = useState(0);

  const getClassicTime = (number: number) => {
    const now = new Date().getTime();
    const nthNumber = classicSolver(number);
    const finishedTime = new Date().getTime() - now;
    setClassicTime(finishedTime);
  };

  const classicSolver = (number: number): number => {
    if (number <= 1) return number;

    return classicSolver(number - 1) + classicSolver(number - 2);
  };

  const memoizationSolver = (number: number, memo) => {
    if (memo[number]) {
      return memo[number];
    }
    if (number <= 1) return number;

    return (memo[number] =
      memoizationSolver(number - 1, memo) + memoizationSolver(number - 2, memo));
  };

  const getMemoizationTime = (number: number) => {
    const now = new Date().getTime();
    const nthNumber = memoizationSolver(number, {});
    const finishedTime = new Date().getTime() - now;
    setMemoizationTime(finishedTime);
    setNumber(nthNumber);
  };

  const startTest = (number: number) => {
    getClassicTime(number);
    getMemoizationTime(number);
  };

  return (
    <>
      <h4>
        Choose one of the n-th fibonacci number to see time difference between classic recursive
        fibonacci vs using memoization
      </h4>
      <p>Numbers above 45 only run the memoization function</p>

      <button onClick={() => startTest(30)}>30</button>
      <button onClick={() => startTest(35)}>35</button>
      <button onClick={() => startTest(40)}>40</button>
      <button onClick={() => startTest(45)}>45</button>

      <button onClick={() => getMemoizationTime(1000)}>1000</button>
      <button onClick={() => getMemoizationTime(2222)}>2222</button>
      <button onClick={() => getMemoizationTime(7000)}>5000</button>
      <button onClick={() => getMemoizationTime(8000)}>8000</button>

      <p>Time to get selected fibonacci number on that position</p>
      <pre>Number: {number}</pre>
      <pre>Classic Fibonacci time: {classicTime}</pre>
      <pre>Memoization Fibonacci time: {memoizationTime}</pre>
    </>
  );
};

export default Memoization;
