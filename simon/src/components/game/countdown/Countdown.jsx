import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";

// Components
import CountDownComp from "./Countdown.js";

class Countdown extends Component {
  render() {
    return (
      <CountDownComp>
        <ReactCountdownClock
          seconds={2}
          color="#373242"
          alpha={1}
          size={500}
          showMilliseconds={false}
          onComplete={() =>
            this.props.onStartUserInput(this.props.currentRound)
          }
        />
      </CountDownComp>
    );
  }
}

export default Countdown;
