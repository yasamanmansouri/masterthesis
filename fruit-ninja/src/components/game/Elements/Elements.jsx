import React, { Component } from "react";

// Styled componets
import Element from "../Element/ElementContainer.js";
import DashBoard from "../../dashBoard/DashBoardContainer.js";

// Helper
import {
  getOpacity,
  getAdaptationScore,
  getSpeed,
  getCoordinates
} from "../../../utils/helper.js";

// Interval to adapt is 10sec
const ADAPTION_INTERVAL = 10000;

class Elements extends Component {
  constructor(props) {
    super(props);
    this.adaptationInterval = null;
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.gameStarted && nextProps.gameStarted) {
      this.createElements();

      this.adaptationInterval = setInterval(
        this.triggerAdaptation,
        ADAPTION_INTERVAL
      );
      return;
    }
    if (this.props.gameStarted && nextProps.elements.length === 0) {
      this.createElements();
    }

    if (nextProps.elements.length > this.props.elements.length) {
      this.forceUpdate();
    }
  }

  createElements = () => {
    for (let i = 0; i < this.props.numberOfElementsToCreate; i++) {
      const id = Math.floor(Math.random() * 10000000);
      this.props.createElement(id);
    }
  };

  triggerAdaptation = () => {
    const score = getAdaptationScore(this.props.hits, this.props.misses);
    // Save results for the round
    this.saveResults();
    // Stop adapting after 10 rounds
    if (this.props.round === 10 || this.props.rollback) {
      clearInterval(this.elementInterval);
      clearInterval(this.adaptationInterval);
      this.props.goToResults();
      return;
    }
    if (this.props.round < 3) {
      // first two rounds adapt for learning
      this.next(false);
      return;
    }
    if (score > 0) {
      // Positive score --> adapt
      this.next(false);
    } else {
      // Negative score --> Set rollback flag
      this.next(true);
    }
  };

  next(rollback) {
    if (rollback) {
      if (this.props.dimension === "Content") {
        this.props.changeNumberOfElementsToCreate(rollback);
      }
      if (this.props.dimension === "Incentives") {
        this.props.changeIncentives(rollback);
      }
      this.props.onSetRollback();
    }
    if (this.props.dimension === "Content") {
      this.props.changeNumberOfElementsToCreate(false);
    }
    if (this.props.dimension === "Incentives") {
      this.props.changeIncentives(false);
    }
    this.props.onNextRound();
  }

  saveResults = () => {
    this.saveRound();
    this.props.resetClicks();
    this.props.resetHitsAndMisses();
  };

  saveRound = () => {
    const {
      hits,
      misses,
      clicks,
      round,
      rollback,
      dimension,
      incentives,
      numberOfElementsToCreate
    } = this.props;
    let dimensionProperty;
    switch (dimension) {
      case "Speed":
        dimensionProperty = getSpeed(round, rollback);
        break;
      case "Object clarity":
        dimensionProperty = getOpacity(round, rollback);
        break;
      case "Incentives":
        dimensionProperty = incentives;
        break;
      case "Content":
        dimensionProperty = numberOfElementsToCreate;
        break;
      default:
        null;
    }
    this.props.onSaveRound(round, hits, misses, clicks, dimensionProperty);
  };

  render() {
    const coordinates = getCoordinates(this.props.elements);
    if (this.props.gameStarted) {
      return (
        <div>
          {this.props.elements.map((element, index) => {
            const xCoordinate = coordinates[index];
            return (
              <Element
                key={element}
                elementId={element}
                xCoordinate={xCoordinate}
              />
            );
          })}
          <DashBoard />
        </div>
      );
    }
    return null;
  }
}

export default Elements;
