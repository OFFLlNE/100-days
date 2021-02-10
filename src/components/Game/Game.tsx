import React, { useState } from 'react';
import classNames from 'classnames';
import { GAME_FIELD, MOVEMENT_PATH } from './Game.contants';

import './Game.scss';

// TODO:

// Move on Game tick
// Add block detection around the tower
// Add shooting animation
// Scoring

const Game = (): JSX.Element => {
  const [gameField, setGameField] = useState(GAME_FIELD);
  const [playerHealth, setPlayerHealth] = useState(10);
  const [money, setMoney] = useState(100);
  const [wave, setWave] = useState(1);
  const [isPlacingTurret, setIsPlacingTurret] = useState(false);
  const [alert, setAlert] = useState('Welcome to my game');

  const move = (xCoord: number, yCoord: number) => {
    const currentIndex = getCurrentPositionOnPath(xCoord, yCoord);

    if (currentIndex === 35) return handleFinish();

    const { nextXCoord, nextYCoord } = getNextStep(currentIndex);

    const surroundingCoords = getSurroundingCoordinates(
      parseFloat(nextXCoord),
      parseFloat(nextYCoord),
    );
    console.log('surroundingCoords: ', surroundingCoords);

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

  const placeTurret = ({ x, y }) => {
    const currentGameField = [...gameField];
    currentGameField[x][y] = 'T';
    setGameField(currentGameField);
  };

  const startPlacingTurret = () => {
    if (money >= 25) {
      setIsPlacingTurret(true);
      setMoney(money - 25);
    } else {
      setAlert('No money!');
    }
  };

  return (
    <>
      <h3>{alert}</h3>
      <div className="game">
        <div className="game--board">
          {gameField.map((fieldRow, rowIndex) =>
            fieldRow.map((fieldElement, elementIndex) => (
              <FieldElement
                key={rowIndex.toString() + elementIndex.toString()}
                coordinateString={rowIndex.toString() + elementIndex.toString()}
                content={fieldElement}
                isPlacingTurret={isPlacingTurret}
                turretInProgress={setIsPlacingTurret}
                placeTurret={placeTurret}
              />
            )),
          )}
        </div>
        <div className="game--stats">
          <p>Hitpoints left: {playerHealth}</p>
          <p>Money left: {money}$</p>
          <p>Current wave: {wave}</p>
          <button onClick={() => moveM()}>Move!</button>
          <button onClick={() => startPlacingTurret()}>Create Turret!</button>
        </div>
      </div>
    </>
  );
};

const FieldElement = (prop: {
  coordinateString: string;
  content: string;
  isPlacingTurret: boolean;
  turretInProgress;
  placeTurret;
}): JSX.Element => {
  return (
    <button
      className={classNames(
        'game--field-element',
        prop.content === 'X' ? (prop.isPlacingTurret ? 'F' : 'X') : prop.content,
      )}
      onClick={(e) => {
        const buttonClickedOn = e.target as HTMLInputElement;
        if (buttonClickedOn.innerHTML === 'F') {
          prop.placeTurret({
            x: prop.coordinateString.split('')[0],
            y: prop.coordinateString.split('')[1],
          });
          prop.turretInProgress(false);
        }
      }}
    >
      {prop.content === 'X' ? (prop.isPlacingTurret ? 'F' : 'X') : prop.content}
    </button>
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

function getSurroundingCoordinates(x: number, y: number): Array<string> {
  const possibleXCoordinates = [x, x - 1, x + 1].filter((coord) => 0 <= coord && coord < 10);
  const possibleYCoordinates = [y, y - 1, y + 1].filter((coord) => coord >= 0);
  const possibleCoordinates = [];
  possibleXCoordinates.forEach((xCoord) => {
    possibleYCoordinates.forEach((yCoord) => {
      possibleCoordinates.push(xCoord + '' + yCoord);
    });
  });

  return possibleCoordinates;
}
