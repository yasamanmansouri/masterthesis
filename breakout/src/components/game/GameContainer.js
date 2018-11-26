import { connect } from "react-redux";

// Components
import Game from "./Game.jsx";

// Actions
import {
  setNewSpeed,
  saveRound,
  goToResults,
  saveClick,
  resetClicks
} from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  adaptationDimension: state.adaptation.dimension,
  speed: state.adaptation.speed,
  round: state.adaptation.round,
  isResults: state.navigation.results,
  clicks: state.user.clicks
});

const mapDispatchToProps = dispatch => ({
  onSetNewSpeed: rollback => {
    dispatch(setNewSpeed(rollback));
  },
  onSaveRound: (round, destroyedBricks, losses, clicks, dimensionProperty) => {
    dispatch(
      saveRound(round, destroyedBricks, losses, clicks, dimensionProperty)
    );
  },
  goToResults: () => {
    dispatch(goToResults());
  },
  saveClick: click => {
    dispatch(saveClick(click));
  },
  resetClicks: () => {
    dispatch(resetClicks());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
