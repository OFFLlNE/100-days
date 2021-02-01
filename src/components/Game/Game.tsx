import React from "react";
import classNames from "classnames";

import "./Game.scss";

// TODO:
// Somehow I need to update GAME FIELD in updateField method. Maybe using gamefield in the state.

const GAME_FIELD = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "O", "O", "O", "X"],
  ["X", "O", "O", "O", "X", "X", "O", "X", "O", "O"],
  ["X", "O", "X", "O", "X", "X", "O", "X", "X", "X"],
  ["X", "O", "X", "O", "O", "X", "O", "O", "X", "X"],
  ["X", "O", "X", "X", "O", "X", "X", "O", "X", "X"],
  ["X", "O", "X", "O", "O", "X", "X", "O", "O", "X"],
  ["X", "O", "X", "O", "X", "X", "X", "X", "O", "X"],
  ["M", "O", "X", "O", "O", "O", "O", "O", "O", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
];

// 35 steps
const MOVEMENT_PATH = [
  "08", "18", "17", "16", "15", "14", "13", "12", "22", "32", "33", "34", // eslint-disable-line
  "44", "45", "46", "36", "37", "38", "48", "58", "68", "78", "88", "87", // eslint-disable-line
  "86", "76", "75", "74", "64", "63", "62", "61", "71", "81", "82", "92"  // eslint-disable-line
];

const Game = (): JSX.Element => {
  const getCurrentPositionOnPath = (position: string) => {
    return MOVEMENT_PATH.indexOf(position);
  };

  const move = (xCoord: number, yCoord: number) => {
    // Gets the current position of passed in X and Y
    const coordinateString = xCoord.toString() + yCoord.toString();
    // Gets the position in the MOVEMENT_PATH
    const currentIndex = getCurrentPositionOnPath(coordinateString);
    // Gets coordinateString for next step from MOVEMENT_PATH
    if (currentIndex === 35) return {nextXCoord: xCoord, nextYCoord: yCoord};
    const nextStepCoordinates = MOVEMENT_PATH[currentIndex + 1];
    const nextXCoord = nextStepCoordinates.split("")[0];
    const nextYCoord = nextStepCoordinates.split("")[1];
    // console.log("Next step will be: ", {nextXCoord, nextYCoord});

    return {nextXCoord, nextYCoord};
  };

  const updateField = (previousStep, nextStep) => {
    console.log("Wat");

    GAME_FIELD[previousStep.y][previousStep.x] = "O";
    GAME_FIELD[nextStep.nextYCoord][nextStep.nextXCoord] = "M";
  };

  const retrieveCoordinates = () => {
    GAME_FIELD.map((fieldRow) => {
      if (fieldRow.indexOf("M") >= 0) {
        console.log("Current X: ", fieldRow.indexOf("M"), "Y: ", GAME_FIELD.indexOf(fieldRow));
        console.log(
          "Next step coordinates are: ",
          move(fieldRow.indexOf("M"), GAME_FIELD.indexOf(fieldRow))
        );
        updateField(
          {x: fieldRow.indexOf("M"), y: GAME_FIELD.indexOf(fieldRow)},
          move(fieldRow.indexOf("M"), GAME_FIELD.indexOf(fieldRow))
        );
      }
    });
  };

  return (
    <div className="game">
      <div className="game--board">
        {GAME_FIELD.map((fieldRow, rowIndex) =>
          fieldRow.map((fieldElement, elementIndex) => (
            <FieldElement
              key={rowIndex.toString() + elementIndex.toString()}
              content={fieldElement}
            />
          ))
        )}
        <button onClick={() => retrieveCoordinates()}>Get M coordinates</button>
      </div>
    </div>
  );
};

const FieldElement = (prop: {content: string}): JSX.Element => {
  return (
    <button className={classNames("game--field-element", prop.content)}>{prop.content}</button>
  );
};

export default Game;
