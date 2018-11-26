//  

import { connect } from "react-redux";

// Wrapped component
import TrainingStage from "./TrainingStage.jsx";

// Actions
import { startCountdown } from "../../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  training: state.navigation.training,
  round: state.navigation.round,
  currentRound: state.currentRound,
  speed: state.user.speed,
  opacity: state.user.opacity
});

const mapDispatchToProps = dispatch => ({
  onStartCountdown: () => {
    dispatch(startCountdown());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingStage);
