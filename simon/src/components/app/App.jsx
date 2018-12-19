import React, { Component } from "react";
import Pressure from "pressure";

import { ThemeProvider } from "styled-components";

// Components
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import Results from "../results/ResultsContainer.js";
import Game from "../game/GameContainer.js";

// Styled components
import AppComp from "./App.js";

// Utils
import { createElements } from "../../utils/elements.js";
import {
  getTime
} from "../../utils/results.js";

class App extends Component {
  // Initialize elements
  componentWillMount() {
    this.props.onWriteElementsToState(createElements(12));
  }

  handleFallbackClickStart = event => {
    const clickStart = Date.now();
    const xCoordinate = event.touches[0].clientX;
    const yCoordinate = event.touches[0].clientY;
    const target = event.target.id;
    this.setState(
      {
        ...this.state,
        fallbackClick: { start: clickStart, xCoordinate, yCoordinate, target }
      },
      () => {
        this.props.saveClick(this.state.fallbackClick);
        this.setState({
          ...this.state,
          fallbackClick: {
            start: 0,
            xCoordinate: 0,
            yCoordinate: 0,
            target: ''
          }
        });
      }
    );
  };

  componentDidMount() {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
      const element = document.getElementById("app");
      element.addEventListener(
        "touchstart",
        this.handleFallbackClickStart,
        false
      );
      Pressure.set(element, {
        start: event => {
          const clickStart = Date.now();
          let xCoordinate;
          let yCoordinate;
          let target;
          if (event.touches.length === 1) {
            const touch = event.touches[0];
            xCoordinate = touch.clientX;
            yCoordinate = touch.clientY;
            target = event.target.id;
          }
          this.setState({
            ...this.state,
            click: {
              ...this.state.click,
              start: clickStart,
              xCoordinate,
              yCoordinate,
              target
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
                  duration: 0,
                  target: ''
                }
              });
            }
          );
        }
      });
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp id="app">
          <UserIdInput />
          {this.props.userId ? <Game /> : null}
          <Results />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
