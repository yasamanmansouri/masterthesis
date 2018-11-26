//

import { connect } from "react-redux";

// Wrapped component
import Game from "./Game.jsx";

// Actions
import { startGame, saveClick } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  isResults: state.navigation.results,
  gameStarted: state.game.started
});

const mapDispatchToProps = dispatch => ({
  startGame: () => {
    dispatch(startGame());
  },
  saveClick: click => {
    dispatch(saveClick(click));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
