import { connect } from "react-redux";

// Components
import App from "./App.jsx";

// Actions
import { saveClick } from "../../actions/actions.js";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  saveClick: click => {
    dispatch(saveClick(click));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
