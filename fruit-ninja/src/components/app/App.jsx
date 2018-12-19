import React, { Component } from "react";
import Pressure from "pressure";

import { ThemeProvider } from "styled-components";

// Helper
import { getTime } from "../../utils/helper.js";

// Components
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import Results from "../results/ResultsContainer.js";
import Game from "../game/GameContainer.js";

// Styled components
import AppComp from "./App.js";

class App extends Component {
  state = {
    click: {
      start: 0,
      end: 0,
      xCoordinate: 0,
      yCoordinate: 0,
      force: 0,
      duration: 0,
      target: ''
    },
    fallbackClick: {
      start: 0,
      xCoordinate: 0,
      yCoordinate: 0,
      target: ''
    }
  };

  handleFallbackClickStart = event => {
    const clickStart = Date.now();
    const xCoordinate = event.touches[0].clientX;
    const yCoordinate = event.touches[0].clientY;
    const target = event.target.id;
    this.setState(
      {
        ...this.state,
        fallbackClick: {
          start: clickStart || 0,
          xCoordinate: xCoordinate || 0,
          yCoordinate: yCoordinate || 0,
          target: target || '',
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
              xCoordinate: xCoordinate || 0,
              yCoordinate: yCoordinate || 0,
              target: target || '',
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
          <Game />
          <Results />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
