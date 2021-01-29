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
  ["O", "O", "X", "O", "O", "O", "O", "O", "O", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
];

const Game = (): JSX.Element => {
  return (
    <div className="game">
      <div className="game--board">
        {GAME_FIELD.map((fieldRow) =>
          fieldRow.map((fieldElement) => <FieldElement key={fieldElement} content={fieldElement} />)
        )}
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
