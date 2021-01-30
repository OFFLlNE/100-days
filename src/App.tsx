import React from "react";
import HelloWorld from "components/HelloWorld";
import {Calculator} from "components/Calculator";
import {Game} from "components/Game";

const App = (): JSX.Element => (
  <div style={{padding: "30px"}}>
    <HelloWorld />
    <hr />
    <Game />
    <hr />
    <Calculator />
  </div>
);
export default App;
