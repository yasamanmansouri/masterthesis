import React, { Component } from "react";

// Styled componets
import GameAreaComp from "./GameArea.js";
// Components
import Game from "../GameContainer.js";

class GameArea extends Component {
  render() {
    if (this.props.userId) {
      return (
        <GameAreaComp>
          <Game />
        </GameAreaComp>
      );
    } else return null;
  }
}

export default GameArea;
