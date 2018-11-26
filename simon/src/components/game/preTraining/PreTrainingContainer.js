//  

import { connect } from "react-redux";

// Wrapped component
import PreTraining from "./PreTraining.jsx";

// Actions
import {
  startTraining,
  writePatternToState
} from "../../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  patternLength: state.user.patternLength
});

const mapDispatchToProps = dispatch => ({
  onStartTraining: () => {
    dispatch(startTraining());
  },
  onWritePatternToState: (pattern, currentRound) => {
    dispatch(writePatternToState(pattern, currentRound));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PreTraining);
