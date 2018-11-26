import React, { Component } from "react";

import { theme } from "../../../constants/Theme.js";

// Styled componets
import ElementComp from "./Element.js";
import ClickArea from "./ClickArea.js";
import Incentive from "../Incentives/IncentiveContainer.js";

// Helper
import { getOpacity, getSpeed } from "../../../utils/helper.js";

class Element extends Component {
  constructor(props) {
    super(props);
    this.update = true;
  }
  shouldComponentUpdate() {
    return this.update;
  }
  state = { clicked: false };
  componentDidMount = () => {
    this.update = !(this.props.dimension === "Incentives");
    this.checkForAnimationEnd();
  };

  checkForAnimationEnd = () => {
    const element = document.getElementById(
      `animation-${this.props.elementId}`
    );
    element.addEventListener("animationend", () => {
      this.setState({ clicked: true });
      this.props.missElement(this.props.elementId);
    });
  };
  clickElement() {
    this.setState({ clicked: true });
    this.props.hitElement(this.props.elementId);
    if (this.props.dimension === "Incentives") {
      this.props.toggleIncentives(this.props.isIncentiveActive);
      setTimeout(() => {
        this.props.toggleIncentives(this.props.isIncentiveActive);
      }, 500);
    }
  }

  render() {
    const { dimension, round, rollback } = this.props;
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 4)];
    const iconValue = icons[icon];
    const yCoordinate = Math.floor(Math.random() * 400);
    const opacity =
      dimension === "Object clarity" ? getOpacity(round, rollback) : 1;
    const speed = dimension === "Speed" ? getSpeed(round, rollback) : 2.5;

    return (
      <div>
        <ClickArea
          onClick={event => this.clickElement()}
          opacity={opacity}
          speed={speed}
          yCoordinate={yCoordinate}
          xCoordinate={this.props.xCoordinate}
          clicked={this.state.clicked}
          id={`animation-${this.props.elementId}`}
        >
          <ElementComp src={iconValue} />
        </ClickArea>
        <Incentive />
      </div>
    );
  }
}

export default Element;
