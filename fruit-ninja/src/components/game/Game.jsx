import React, { Component } from "react";
import Pressure from "pressure";

// Styled componets
import GameComp from "./Game.js";
import Button from "../general/Button.js";

import Elements from "./Elements/ElementsContainer.js";

// Helper
import { getTime } from "../../utils/helper.js";

class Game extends Component {
  state = {
    click: {
      start: 0,
      end: 0,
      xCoordinate: 0,
      yCoordinate: 0,
      force: 0,
      duration: 0
    },
    fallbackClick: {
      start: 0,
      xCoordinate: 0,
      yCoordinate: 0
    }
  };

  handleFallbackClickStart = event => {
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
      },
      () => {
        this.props.saveClick(this.state.fallbackClick);
        this.setState({
          ...this.state,
          fallbackClick: {
            start: 0,
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
        this.handleFallbackClickStart,
        false
      );
      Pressure.set("#element", {
        start: event => {
          const clickStart = Date.now();
          let xCoordinate;
          let yCoordinate;
          if (event.touches.length === 1) {
            const touch = event.touches[0];
            xCoordinate = touch.clientX;
            yCoordinate = touch.clientY;
          }
          this.setState({
            ...this.state,
            click: {
              ...this.state.click,
              start: clickStart,
              xCoordinate: xCoordinate || 0,
              yCoordinate: yCoordinate || 0
            }
          });
        },
        change: (force, event) => {
          this.setState({
            ...this.state,
            click: { ...this.state.click, force }
          });
        },
        end: () => {
          const clickEnd = Date.now();
          const clickStart = this.state.click.start;
          const clickDuration = getTime(clickStart, clickEnd);
          this.setState(
            {
              ...this.state,
              click: {
                ...this.state.click,
                end: clickEnd,
                duration: clickDuration
              }
            },
            () => {
              this.props.saveClick(this.state.click);
              this.setState({
                ...this.state,
                click: {
                  start: 0,
                  end: 0,
                  xCoordinate: 0,
                  yCoordinate: 0,
                  force: 0,
                  duration: 0
                }
              });
            }
          );
        }
      });
    }
  }

  start = () => {
    this.props.startGame();
  };

  render() {
    if (!this.props.isResults) {
      return (
        <div id="element">
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
