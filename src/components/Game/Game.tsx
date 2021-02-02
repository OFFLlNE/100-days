import React, { useState } from 'react';
import classNames from 'classnames';

import './Game.scss';

// TODO:
// Some bug where it skips some steps at some point but doing multiple movements in one move --- seems to appear when moving down

const GAME_FIELD = [
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'X'],
  ['X', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'O', 'O'],
  ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'X', 'X'],
  ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'O', 'X', 'X'],
  ['X', 'O', 'X', 'X', 'O', 'X', 'X', 'O', 'X', 'X'],
  ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'O', 'O', 'X'],
  ['X', 'O', 'X', 'O', 'X', 'X', 'X', 'X', 'O', 'X'],
  ['M', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
];

// 35 steps
const MOVEMENT_PATH = [
  "08", "18", "17", "16", "15", "14", "13", "12", "22", "32", "33", "34", // eslint-disable-line
  "44", "45", "46", "36", "37", "38", "48", "58", "68", "78", "88", "87", // eslint-disable-line
  "86", "76", "75", "74", "64", "63", "62", "61", "71", "81", "82", "92"  // eslint-disable-line
];

const Game = (): JSX.Element => {
  const [gameField, setGameField] = useState(GAME_FIELD);

  const getCurrentPositionOnPath = (position: string) => {
    return MOVEMENT_PATH.indexOf(position);
  };

  const move = (xCoord: number, yCoord: number) => {
    // Gets the current position of passed in X and Y
    const coordinateString = xCoord.toString() + yCoord.toString();
    // Gets the position in the MOVEMENT_PATH
    const currentIndex = getCurrentPositionOnPath(coordinateString);
    // Gets coordinateString for next step from MOVEMENT_PATH
    if (currentIndex === 35) return { nextXCoord: xCoord, nextYCoord: yCoord };
    const nextStepCoordinates = MOVEMENT_PATH[currentIndex + 1];

    const nextXCoord = nextStepCoordinates.split('')[0];
    const nextYCoord = nextStepCoordinates.split('')[1];

    return { nextXCoord, nextYCoord };
  };

  const updateField = (previousStep, nextStep) => {
    const currentGameField = [...gameField];
    currentGameField[previousStep.y][previousStep.x] = 'O';
    currentGameField[nextStep.nextYCoord][nextStep.nextXCoord] = 'M';
    setGameField(currentGameField);
  };

  const moveM = () => {
    console.log('gameField: ', gameField);

    gameField.map((fieldRow) => {
      console.log('Mapping');

      if (fieldRow.indexOf('M') >= 0) {
        console.log(
          'Updating: previousStep: X: ',
          fieldRow.indexOf('M'),
          'Y: ',
          gameField.indexOf(fieldRow),
        );
        console.log(
          'Updating: nextStep: ',
          move(fieldRow.indexOf('M'), gameField.indexOf(fieldRow)),
        );
        updateField(
          { x: fieldRow.indexOf('M'), y: gameField.indexOf(fieldRow) },
          move(fieldRow.indexOf('M'), gameField.indexOf(fieldRow)),
        );
      }
    });
  };

  return (
    <div className="game">
      <div className="game--board">
        {gameField.map((fieldRow, rowIndex) =>
          fieldRow.map((fieldElement, elementIndex) => (
            <FieldElement
              key={rowIndex.toString() + elementIndex.toString()}
              content={fieldElement}
            />
          )),
        )}
        <button onClick={() => moveM()}>Move!</button>
      </div>
    </div>
  );
};

const FieldElement = (prop: { content: string }): JSX.Element => {
  return (
    <button className={classNames('game--field-element', prop.content)}>{prop.content}</button>
  );
};

export default Game;
