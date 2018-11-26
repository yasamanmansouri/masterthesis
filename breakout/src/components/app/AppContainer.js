import { connect } from "react-redux";

// Components
import App from "./App.jsx";

const mapStateToProps = state => ({
  userId: state.user.id,
  isResults: state.navigation.results
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
