import React, { Component } from "react";

// Styled-Components
import ResultsComp from "./Results.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";
import Button from "../general/Button.js";

class Results extends Component {
  render() {
    if (this.props.isResults) {
      return (
        <ResultsComp>
          <Title>Thank you for participating!</Title>
          <Paragraph>Your results will be saved</Paragraph>
          <Button
            onClick={() =>
              this.props.sendResultsToDb(this.props.results, this.props.userId)
            }
          >
            Submit
          </Button>
        </ResultsComp>
      );
    }
    return null;
  }
}

export default Results;
