//

import { connect } from "react-redux";

// Wrapped component
import UserInputStage from "./UserInputStage.jsx";

// Actions
import {
  showResults,
  nextRound,
  writeToResults,
  setNewSpeed,
  setNewOpacity,
  setRollback,
  addPoints,
  setNewPoints,
  setNewPatternLength,
  saveClick
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  userInput: state.navigation.userInput,
  selectedElements: state.input.selected,
  round: state.navigation.round,
  currentRound: state.currentRound,
  showResults: state.navigation.results,
  results: state.results,
  speed: state.user.speed,
  opacity: state.user.opacity,
  dimension: state.user.dimension,
  rollback: state.user.rollback,
  patternLength: state.user.patternLength,
  points: state.user.points,
  pointsValue: state.user.pointsValue,
  clicks: state.user.clicks
});

const mapDispatchToProps = dispatch => ({
  onWriteToResults: (results, round, dimensionProperty) => {
    dispatch(writeToResults(results, round, dimensionProperty));
  },
  onNextRound: score => {
    dispatch(nextRound(score));
  },
  onShowResults: () => {
    dispatch(showResults());
  },
  onSetNewSpeed: (currentSpeed, rollback) => {
    dispatch(setNewSpeed(currentSpeed, rollback));
  },
  onSetRollback: () => {
    dispatch(setRollback());
  },
  onSetNewOpacity: (currentOpacity, rollback) => {
    dispatch(setNewOpacity(currentOpacity, rollback));
  },
  onSetNewPoints: (currentPoints, rollback) => {
    dispatch(setNewPoints(currentPoints, rollback));
  },
  onSetNewPatternLength: (currentPatternLength, rollback) => {
    dispatch(setNewPatternLength(currentPatternLength, rollback));
  },
  addPoints: round => {
    dispatch(addPoints(round));
  },
  saveClick: click => {
    dispatch(saveClick(click));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInputStage);
