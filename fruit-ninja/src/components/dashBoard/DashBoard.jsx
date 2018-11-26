import React, { Component } from "react";

// Components
import DashBoardComp from "./DashBoard.js";
import Paragraph from "../general/Paragraph.js";

class DashBoard extends Component {
  render() {
    if (this.props.dimension === "Incentives") {
      return (
        <DashBoardComp>
          <Paragraph inline bold>
            Points:{" "}
          </Paragraph>
          <Paragraph inline bold>
            {this.props.points}
          </Paragraph>
        </DashBoardComp>
      );
    }
    return null;
  }
}

export default DashBoard;
