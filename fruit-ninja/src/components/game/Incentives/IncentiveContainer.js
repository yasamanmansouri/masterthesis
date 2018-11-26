import { connect } from "react-redux";

// Wrapped component
import Incentive from "./Incentive.jsx";

const mapStateToProps = state => ({
  incentives: state.adaptation.incentives,
  isIncentiveActive: state.adaptation.isIncentiveActive
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Incentive);
