//  

import { connect } from "react-redux";

// Wrapped component
import DashBoard from "./DashBoard.jsx";

const mapStateToProps = state => ({
  dimension: state.user.dimension,
  points: state.user.points
});

export default connect(mapStateToProps, null)(DashBoard);
