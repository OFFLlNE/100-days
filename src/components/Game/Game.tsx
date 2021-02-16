import React, { useState } from 'react';
import classNames from 'classnames';
import { GAME_FIELD, MOVEMENT_PATH } from './Game.contants';

import './Game.scss';

// TODO:
// Move on Game tick
// Start wave button
// Stop animation after round end

const Game = (): JSX.Element => {
  const [gameField, setGameField] = useState(GAME_FIELD);
  const [playerHealth, setPlayerHealth] = useState(10);
  const [money, setMoney] = useState(100);
  const [wave, setWave] = useState(1);
  const [isPlacingTurret, setIsPlacingTurret] = useState(false);
  const [alert, setAlert] = useState('Welcome to my game');
  const [turretCoordinates, setTurretCoordinates] = useState([]);
  const [enemyHP, setEnemyHP] = useState(10);
  const [defaultEnemyHP, setDefaultEnemyHP] = useState(10);
  const [shootingTurrets, setShootingTurrets] = useState([]);

  const move = (xCoord: number, yCoord: number) => {
    const currentIndex = getCurrentPositionOnPath(xCoord, yCoord);

    if (currentIndex === 35) return handleFinish('lostLife');

    const { nextXCoord, nextYCoord } = getNextStep(currentIndex);

    const surroundingCoords = getSurroundingCoordinates(nextXCoord, nextYCoord);
    const surroundingTurrets = getTurretCoordinateMatches(surroundingCoords, turretCoordinates);
    setShootingTurrets(surroundingTurrets);
    const countOfTurretsSurrounding = surroundingTurrets.length;
    if (enemyHP <= countOfTurretsSurrounding) return handleFinish('killedMonster');
    setEnemyHP(enemyHP - countOfTurretsSurrounding);

    return { nextXCoord, nextYCoord };
  };

  const updateField = (
    previousStep: { x: number; y: number },
    nextStep: { nextXCoord: number; nextYCoord: number },
  ) => {
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

  const handleFinish = (finishReason: string) => {
    if (finishReason === 'lostLife') {
      loseOneLife();
      setEnemyHP(defaultEnemyHP);
    } else if (finishReason === 'killedMonster') {
      const newMonsterDefaultHP = defaultEnemyHP * 1.5;
      setDefaultEnemyHP(newMonsterDefaultHP);
      setEnemyHP(newMonsterDefaultHP);
      setMoney(money + 50);
    }
    setWave(wave + 1);
    return moveToTheBeginning();
  };

  const placeTurret = ({ x, y }) => {
    const currentGameField = [...gameField];
    currentGameField[x][y] = 'T';
    setGameField(currentGameField);

    const currentTurrets = [...turretCoordinates];
    currentTurrets.push(y + x);
    setTurretCoordinates(currentTurrets);
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
                shootingTurrets={shootingTurrets}
              />
            )),
          )}
        </div>
        <div className="game--stats">
          <p>Hitpoints left: {playerHealth}</p>
          <p>Money left: {money}$</p>
          <p>Current wave: {wave}</p>
          <p>Monster health: {enemyHP}</p>
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
  shootingTurrets: Array<string>;
}): JSX.Element => {
  return (
    <button
      className={classNames(
        'game--field-element',
        prop.content === 'X' ? (prop.isPlacingTurret ? 'F' : 'X') : prop.content,
        prop.shootingTurrets.includes(prop.coordinateString.split('').reverse().join(''))
          ? 'shooting-animation'
          : '',
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

const getCurrentPositionOnPath = (xCoord: number, yCoord: number) => {
  const coordinateString = xCoord.toString() + yCoord.toString();
  return MOVEMENT_PATH.indexOf(coordinateString);
};

const getNextStep = (currentIndex: number): { nextXCoord: number; nextYCoord: number } => {
  const nextStepCoordinates = MOVEMENT_PATH[currentIndex + 1];
  const nextXCoord = parseFloat(nextStepCoordinates.split('')[0]);
  const nextYCoord = parseFloat(nextStepCoordinates.split('')[1]);

  return { nextXCoord, nextYCoord };
};

const moveToTheBeginning = () => {
  return { nextXCoord: 0, nextYCoord: 8 };
};

const getSurroundingCoordinates = (x: number, y: number): Array<string> => {
  const possibleXCoordinates = [x, x - 1, x + 1].filter((coord) => 0 <= coord && coord < 10);
  const possibleYCoordinates = [y, y - 1, y + 1].filter((coord) => coord >= 0);
  const possibleCoordinates = [];
  possibleXCoordinates.forEach((xCoord) => {
    possibleYCoordinates.forEach((yCoord) => {
      possibleCoordinates.push(xCoord + '' + yCoord);
    });
  });

  return possibleCoordinates;
};

const getTurretCoordinateMatches = (a1: Array<string>, a2: Array<string>): Array<string> => {
  return a1.filter((v) => a2.includes(v));
};
