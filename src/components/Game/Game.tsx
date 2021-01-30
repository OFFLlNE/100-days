import React from "react";
import classNames from "classnames";

import "./Game.scss";

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

const MOVEMENT_PATH = [
  "08", "18", "17", "16", "15", "14", "13", "12", "22", "32", "33", "34", // eslint-disable-line
  "44", "45", "46", "36", "37", "38", "48", "58", "68", "78", "88", "87", // eslint-disable-line
  "86", "76", "75", "74", "64", "63", "62", "61", "71", "81", "82", "92"  // eslint-disable-line
];

// Move function - goes from current position to next position

const Game = (): JSX.Element => {
  const retrieveCoordinates = () => {
    GAME_FIELD.map((fieldRow) => {
      if (fieldRow.indexOf("M") >= 0) {
        console.log("X: ", fieldRow.indexOf("M"), "Y: ", GAME_FIELD.indexOf(fieldRow));
      }
    });
  };

  return (
    <div className="game">
      <div className="game--board">
        {GAME_FIELD.map((fieldRow) =>
          fieldRow.map((fieldElement) => <FieldElement key={fieldElement} content={fieldElement} />)
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
