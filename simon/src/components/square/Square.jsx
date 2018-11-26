import React, { Component } from "react";
import SquareComp from "./Square.js";

class Square extends Component {
  render() {
    return (
      <SquareComp
        active={this.props.active}
        size={this.props.size}
        color={this.props.color}
        margin={this.props.margin}
      />
    );
  }
}

export default Square;
