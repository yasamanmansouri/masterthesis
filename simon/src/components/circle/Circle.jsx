import React, { Component } from "react";
import CircleComp from "./Circle.js";
import Incentive from "./Incentive.js";

class Circle extends Component {
  render() {
    return (
      <CircleComp
        active={this.props.active}
        opacity={this.props.opacity}
        size={this.props.size}
        color={this.props.color}
        margin={this.props.margin}
      >
        {this.props.correct ? (
          <Incentive>+ {this.props.pointsValue}</Incentive>
        ) : null}
      </CircleComp>
    );
  }
}

export default Circle;
