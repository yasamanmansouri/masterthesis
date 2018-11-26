import React, { Component } from "react";

import { ThemeProvider } from "styled-components";

// Components
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import Results from "../results/ResultsContainer.js";
import Game from "../game/GameContainer.js";

// Styled components
import AppComp from "./App.js";

// Utils
import { createElements } from "../../utils/elements.js";

class App extends Component {
  // Initialize elements
  componentWillMount() {
    this.props.onWriteElementsToState(createElements(12));
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>
          <UserIdInput />
          <Game />
          <Results />
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
