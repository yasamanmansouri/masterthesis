//  

import { connect } from "react-redux";

// Wrapped component
import Countdown from "./Countdown.jsx";

// Actions
import { startUserInput } from "../../../actions/actions.js";

const mapDispatchToProps = dispatch => ({
  onStartUserInput: () => {
    dispatch(startUserInput());
  }
});

export default connect(null, mapDispatchToProps)(Countdown);
