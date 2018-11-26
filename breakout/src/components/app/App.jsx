import React, { Component } from "react";

import { ThemeProvider } from "styled-components";

// Components
import UserIdInput from "../userIdInput/UserIdInputContainer.js";
import Game from "../game/GameContainer.js";
import Results from "../results/ResultsContainer.js";

// Styled components
import AppComp from "./App.js";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppComp>
          {!this.props.userId ? <UserIdInput /> : null}
          {!this.props.isResults && this.props.userId ? <Game /> : null}
          {this.props.isResults ? <Results /> : null}
        </AppComp>
      </ThemeProvider>
    );
  }
}

export default App;
