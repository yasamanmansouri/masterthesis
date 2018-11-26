import { connect } from "react-redux";

// Wrapped component
import Elements from "./Elements.jsx";

// Actions
import {
  saveRound,
  goToResults,
  nextRound,
  setRollback,
  changeIncentives,
  resetClicks,
  resetHitsAndMisses,
  createElement,
  changeNumberOfElementsToCreate
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  round: state.adaptation.round,
  rollback: state.user.rollback,
  dimension: state.adaptation.dimension,
  gameStarted: state.game.started,
  hits: state.game.hits,
  misses: state.game.misses,
  clicks: state.user.clicks,
  elements: state.game.elements,
  incentives: state.adaptation.incentives,
  numberOfElementsToCreate: state.game.numberOfElementsToCreate
});

const mapDispatchToProps = dispatch => ({
  onSaveRound: (round, hits, misses, clicks, dimensionProperty) => {
    dispatch(saveRound(round, hits, misses, clicks, dimensionProperty));
  },
  onNextRound: () => {
    dispatch(nextRound());
  },
  onSetRollback: () => {
    dispatch(setRollback());
  },
  goToResults: () => {
    dispatch(goToResults());
  },
  changeIncentives: rollback => {
    dispatch(changeIncentives(rollback));
  },
  resetClicks: () => {
    dispatch(resetClicks());
  },
  resetHitsAndMisses: () => {
    dispatch(resetHitsAndMisses());
  },
  createElement: id => {
    dispatch(createElement(id));
  },
  changeNumberOfElementsToCreate: rollback => {
    dispatch(changeNumberOfElementsToCreate(rollback));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements);
