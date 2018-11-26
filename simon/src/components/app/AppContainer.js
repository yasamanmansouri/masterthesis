//  

import { connect } from "react-redux";

// Components
import App from "./App.jsx";

// Actions
import { writeElementsToState } from "../../actions/actions.js";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onWriteElementsToState: elements => {
    dispatch(writeElementsToState(elements));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
