//

import { connect } from "react-redux";

// Wrapped component
import Square from "./Square.jsx";

const mapStateToProps = state => ({
  opacity: state.user.opacity
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Square);
