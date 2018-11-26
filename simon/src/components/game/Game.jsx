import React, { Component } from "react";

// Components
import PreTraining from "./preTraining/PreTrainingContainer.js";
import TrainingStage from "./trainingStage/TrainingStageContainer.js";
import Countdown from "./countdown/CountdownContainer.js";
import UserInputStage from "./userInputStage/UserInputStageContainer.js";

class Game extends Component {
  render() {
    return (
      <div>
        {this.props.navigation.preTraining ? <PreTraining /> : null}
        {this.props.navigation.training ? (
          <TrainingStage theme={this.props.theme} />
        ) : null}
        {this.props.navigation.countdown ? <Countdown /> : null}
        {this.props.navigation.userInput ? <UserInputStage /> : null}
      </div>
    );
  }
}

export default Game;
