import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "./TrainingStage.js";
import TableComp from "../../table/Table.js";
import TableBodyComp from "../../table/TableBody.js";
import TrComp from "../../table/Tr.js";
import TdComp from "../../table/Td.js";

class TrainingStage extends Component {
  state = {
    activeElement: null
  };

  componentDidMount() {
    this.lightUpElements();
  }

  lightUpElements() {
    this.initiateTimeOut(0);
  }

  initiateTimeOut(i) {
    setTimeout(() => {
      this.light(i);
    }, this.props.speed);
  }

  light(i) {
    this.setState({
      activeElement: this.props.currentRound.pattern[i]
    });
    i++;
    if (i <= this.props.currentRound.pattern.length) {
      this.initiateTimeOut(i);
    } else {
      this.props.onStartCountdown();
    }
  }

  render() {
    return (
      <TrainingStageComp>
        <TableComp>
          <TableBodyComp>
            <TrComp>
              {this.props.elements.slice(0, 4).map((element, key) => {
                let enhancedElement;
                if (element.key === this.state.activeElement) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true,
                      opacity: this.props.opacity
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      opacity: this.props.opacity
                    }
                  };
                }
                return <TdComp key={key}>{enhancedElement}</TdComp>;
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(4, 8).map((element, key) => {
                let enhancedElement;
                if (element.key === this.state.activeElement) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true,
                      opacity: this.props.opacity
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      opacity: this.props.opacity
                    }
                  };
                }
                return <TdComp key={key}>{enhancedElement}</TdComp>;
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(8, 12).map((element, key) => {
                let enhancedElement;
                if (element.key === this.state.activeElement) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true,
                      opacity: this.props.opacity
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      opacity: this.props.opacity
                    }
                  };
                }
                return <TdComp key={key}>{enhancedElement}</TdComp>;
              })}
            </TrComp>
          </TableBodyComp>
        </TableComp>
      </TrainingStageComp>
    );
  }
}

export default TrainingStage;
