import React, { Component } from "react";

// Styled componets
import GameComp from "./Game.js";
import Button from "../general/Button.js";

import Elements from "./Elements/ElementsContainer.js";

class Game extends Component {
  state = {
    fallbackClick: {
      start: 0,
      end: 0,
      xCoordinate: 0,
      yCoordinate: 0
    }
  };

  handleClickStart = event => {
    const clickStart = Date.now();
    const xCoordinate = event.touches[0].clientX;
    const yCoordinate = event.touches[0].clientY;
    this.setState(
      {
        ...this.state,
        fallbackClick: {
          start: clickStart || 0,
          xCoordinate: xCoordinate || 0,
          yCoordinate: yCoordinate || 0
        }
      }
    );
  };
  handleClickEnd = event => {
    const clickEnd = Date.now();
    this.setState(
      {
        ...this.state,
        fallbackClick: { ...this.state.fallbackClick, end: clickEnd}
      },
      () => {
        console.log(this.state.fallbackClick)
        this.props.saveClick(this.state.fallbackClick);
        this.setState({
          ...this.state,
          fallbackClick: {
            start: 0,
            end: 0,
            xCoordinate: 0,
            yCoordinate: 0
          }
        });
      }
    );
  };

  componentDidMount() {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
      const element = document.getElementById("element");
      element.addEventListener(
        "touchstart",
        this.handleClickStart,
        false
      );
      element.addEventListener(
        "touchend",
        this.handleClickEnd,
        false
      );
    }
  }

  start = () => {
    this.props.startGame();
  };

  render() {
    const divStyle = {
      height: "100%"
    }
    if (!this.props.isResults) {
      return (
        <div id="element" style={this.props.userId ? divStyle : {height: "0%"}}>
          <GameComp userId={this.props.userId}>
            <Elements />
            {!this.props.gameStarted ? (
              <Button middle onClick={() => this.start()}>
                Start!
              </Button>
            ) : null}
          </GameComp>
        </div>
      );
    }
    return null;
  }
}

export default Game;
