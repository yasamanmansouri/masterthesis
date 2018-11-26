import React, { Component } from "react";

// Styled Components
import PreTrainingComp from "./PreTraining.js";
import Title from "../../general/Title.js";
import Button from "../../general/Button.js";

// Utils
import { createPattern } from "../../../utils/lightUp.js";

class PreTraining extends Component {
  componentWillMount() {
    this.props.onWritePatternToState(
      createPattern(this.props.patternLength, this.props.elements)
    );
  }

  start() {
    this.props.onStartTraining();
  }

  render() {
    return (
      <PreTrainingComp>
        <Title>Get Ready!</Title>
        <Button onClick={() => this.start()}>Start</Button>
      </PreTrainingComp>
    );
  }
}

export default PreTraining;
