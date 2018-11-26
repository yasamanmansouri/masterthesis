import React, { Component } from "react";

// Styled componets
import Incentive from "./Incentive.js";

class Elements extends Component {
  render() {
    return (
      <Incentive active={this.props.isIncentiveActive}>
        + {this.props.incentives}
      </Incentive>
    );
  }
}

export default Elements;
