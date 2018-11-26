import { connect } from "react-redux";

// Wrapped component
import DashBoard from "./DashBoard.jsx";

const mapStateToProps = state => ({
  dimension: state.adaptation.dimension,
  points: state.adaptation.points
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
