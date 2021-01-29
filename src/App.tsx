import React from "react";
import HelloWorld from "components/HelloWorld";
import {Calculator} from "components/Calculator";
import {Game} from "components/Game";

const App = (): JSX.Element => (
  <>
    <HelloWorld />
    <hr />
    <Game />
    <hr />
    <Calculator />
  </>
);
export default App;
