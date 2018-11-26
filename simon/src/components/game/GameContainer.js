//  

import { connect } from "react-redux";

// Components
import Game from "./Game.jsx";

const mapStateToProps = state => ({
  navigation: state.navigation
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
