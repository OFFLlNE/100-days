import React, { useState } from 'react';
import classNames from 'classnames';
import { GAME_FIELD, MOVEMENT_PATH } from './Game.contants';

import './Game.scss';

// TODO:
// Add tower creation

// Move on Game tick
// Add block detection around the tower
// Add shooting animation
// Scoring

const Game = (): JSX.Element => {
  const [gameField, setGameField] = useState(GAME_FIELD);
  const [playerHealth, setPlayerHealth] = useState(10);
  const [money, setMoney] = useState(100);
  const [wave, setWave] = useState(1);

  const move = (xCoord: number, yCoord: number) => {
    const currentIndex = getCurrentPositionOnPath(xCoord, yCoord);

    if (currentIndex === 35) return handleFinish();

    const { nextXCoord, nextYCoord } = getNextStep(currentIndex);

    return { nextXCoord, nextYCoord };
  };

  const updateField = (previousStep, nextStep) => {
    const currentGameField = [...gameField];
    currentGameField[previousStep.y][previousStep.x] = 'O';
    currentGameField[nextStep.nextYCoord][nextStep.nextXCoord] = 'M';
    setGameField(currentGameField);
  };

  const moveM = () => {
    let currentMIndex;

    gameField.map((fieldRow) => {
      if (fieldRow.indexOf('M') >= 0) {
        currentMIndex = { x: fieldRow.indexOf('M'), y: gameField.indexOf(fieldRow) };
      }
    });

    updateField({ x: currentMIndex.x, y: currentMIndex.y }, move(currentMIndex.x, currentMIndex.y));
  };

  const loseOneLife = () => {
    setPlayerHealth(playerHealth - 1);
  };

  const handleFinish = () => {
    loseOneLife();
    return moveToTheBeginning();
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
      <div className="game--stats">
        <p>Hitpoints left: {playerHealth}</p>
        <p>Money left: {money}$</p>
        <p>Current wave: {wave}</p>
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

function getCurrentPositionOnPath(xCoord: number, yCoord: number) {
  const coordinateString = xCoord.toString() + yCoord.toString();
  return MOVEMENT_PATH.indexOf(coordinateString);
}

function getNextStep(currentIndex) {
  const nextStepCoordinates = MOVEMENT_PATH[currentIndex + 1];
  const nextXCoord = nextStepCoordinates.split('')[0];
  const nextYCoord = nextStepCoordinates.split('')[1];

  return { nextXCoord, nextYCoord };
}

function moveToTheBeginning() {
  return { nextXCoord: 0, nextYCoord: 8 };
}
