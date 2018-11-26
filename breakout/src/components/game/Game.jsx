import React, { Component } from "react";
import { withTheme } from "styled-components";
import Hammer from "hammerjs";
import Pressure from "pressure";

import Incentive from "./Incentive.js";
import DashBoard from "../dashBoard/DashBoard.jsx";

// Components
import Canvas from "./Canvas.js";

// Utils
import {
  createBricks,
  ballColors,
  getTime,
  getAdaptationScore,
  checkCollision
} from "../../utils/game.js";

const BALL_OFFSET = 8;
// Interval to adapt is 10sec
const ADAPTION_INTERVAL = 10000;

class Game extends Component {
  constructor(props) {
    super(props);
    this.width = null;
    this.height = null;
    this.canvas = null;
    this.ctx = null;
    this.balls = [];
    this.paddle = null;
    this.bricks = null;
    this.ballOn = null;
    this.color = null;
    this.gameOver = null;
    this.keys = null;
    this.pressedKeys = null;
    this.interval = null;
    this.ballColor = ballColors[0];
    this.incentives = 10;
    this.ballCount = 1;
    this.rollback = false;
  }
  state = {
    brickCount: 0,
    losses: 0,
    points: 0,
    isIncentiveActive: false,
    click: {
      start: 0,
      end: 0,
      force: 0,
      duration: 0
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.setup();
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
      Pressure.set("#gameCanvas", {
        start: event => {
          const clickStart = Date.now();
          this.setState({
            click: {
              ...this.state.click,
              start: clickStart
            }
          });
        },
        change: (force, event) => {
          this.setState({ click: { ...this.state.click, force } });
        },
        end: () => {
          const clickEnd = Date.now();
          const clickStart = this.state.click.start;
          const clickDuration = getTime(clickStart, clickEnd);
          this.setState(
            {
              click: {
                ...this.state.click,
                end: clickEnd,
                duration: clickDuration
              }
            },
            () => {
              this.props.saveClick(this.state.click);
              this.setState({
                click: {
                  start: 0,
                  end: 0,
                  force: 0,
                  duration: 0
                }
              });
            }
          );
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.speed !== this.props.speed) {
      // Consider the current direction of the ball when adapting the speed
      if (this.balls[0].speedY > 0) {
        this.balls[0].speedY = nextProps.speed;
      } else {
        this.balls[0].speedY = -nextProps.speed;
      }
    }
  }

  setup() {
    // Setup game area
    this.width = this.props.theme.game.width;
    this.height = this.props.theme.game.height;
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    // Setup game elements
    this.setupGameElements();

    this.gameOver = 0; // 1 => lost; 2 => win

    function KeyListener() {
      this.pressedKeys = [];
      this.keydown = function(e) {
        this.pressedKeys[e.keyCode] = true;
      };
      this.keyup = function(e) {
        this.pressedKeys[e.keyCode] = false;
      };
      document.addEventListener("keydown", this.keydown.bind(this));
      document.addEventListener("keyup", this.keyup.bind(this));
    }
    KeyListener.prototype.isPressed = function(key) {
      return this.pressedKeys[key] ? true : false;
    };
    KeyListener.prototype.addKeyPressListener = function(keyCode, callback) {
      document.addEventListener("keypress", function(e) {
        if (e.keyCode === keyCode) callback(e);
      });
    };
    this.keys = new KeyListener();

    const mc = new Hammer(this.canvas);

    // Listen to touch events...
    mc.on("tap", () => {
      // Start game on tap
      this.ballOn = true;
      this.gameOver = 0;
      this.interval = setInterval(this.triggerAdaptation, ADAPTION_INTERVAL);
    });

    mc.on("panleft", event => {
      // Move paddle left
      if (this.paddle.x > 0) {
        this.paddle.x -= this.paddle.speed;
      }
    });
    mc.on("panright", event => {
      // Move paddle right
      if (this.paddle.x + this.paddle.w < this.width) {
        this.paddle.x += this.paddle.speed;
      }
    });

    // Start
    requestAnimationFrame(this.loop);
  }

  saveResults = () => {
    this.saveRound(this.state);
    this.props.resetClicks();
    this.setState({
      brickCount: 0,
      losses: 0
    });
  };

  checkResults = (state, round) => {
    // stop adapting after 10 rounds
    if (round === 10) {
      this.props.goToResults();
      return;
    }
  };

  adapt = rollback => {
    switch (this.props.adaptationDimension) {
      case "Speed":
        if (rollback) {
          // Go back half a speed step
          this.props.onSetNewSpeed(rollback);
          return;
        }
        this.props.onSetNewSpeed();
        break;
      case "Object clarity":
        if (rollback) {
          // Go back to the previous color
          this.ballColor = ballColors[this.props.round - 3];
          return;
        }
        this.ballColor = ballColors[this.props.round - 1];
        break;
      case "Incentives":
        if (rollback) {
          this.incentives = this.incentives - 5;
          return;
        }
        this.incentives = this.incentives + 10;
        break;
      case "Content":
        if (rollback) {
          this.ballCount = this.ballCount - 1;
          return;
        }
        this.ballCount = this.ballCount + 1;
        this.createNewBall();
        break;
      default:
        null;
    }
  };

  triggerAdaptation = () => {
    // Only adapt if the game is active
    if (this.gameOver === 0) {
      // Calculate score
      const score = getAdaptationScore(
        this.state.brickCount,
        this.state.losses
      );
      // Save results for the round
      this.saveResults();
      // Stop adapting after 10 rounds
      if (this.props.round === 10 || this.rollback) {
        this.props.goToResults();
        clearInterval(this.interval);
        return;
      }
      if (this.props.round < 3) {
        // first two rounds adapt for learning
        this.adapt();
        return;
      }
      if (score > 0) {
        // Positive score --> adapt
        this.adapt();
      } else {
        // Negative score --> Set rollback flag
        this.rollback = true;
        this.adapt(true);
      }
    }
  };

  createNewBall = () => {
    this.balls[this.ballCount - 1] = {
      x: this.width / 2 - 1, // -1 => move the ball slightly to give him a starting direction
      y: this.height / 2,
      radius: 8,
      speedX: 0,
      speedY: this.props.speed
    };
  };

  saveRound = state => {
    const destroyedBricks = state.brickCount;
    const losses = state.losses;
    const clicks = this.props.clicks;
    const round = this.props.round;
    let dimensionProperty;
    switch (this.props.adaptationDimension) {
      case "Speed":
        dimensionProperty = this.props.speed;
        break;
      case "Object clarity":
        dimensionProperty = this.ballColor;
        break;
      case "Incentives":
        dimensionProperty = this.incentives;
        break;
      case "Content":
        dimensionProperty = this.ballCount;
        break;
      default:
        null;
    }
    this.props.onSaveRound(
      round,
      destroyedBricks,
      losses,
      clicks,
      dimensionProperty
    );
  };

  setupGameElements = () => {
    for (let i = 0; i < this.ballCount; i++) {
      this.balls[i] = {
        x: this.width / 2 - 1, // -1 => move the ball slightly to give him a starting direction
        y: this.height / 2,
        radius: 8,
        speedX: 0,
        speedY: this.props.speed
      };
    }
    this.paddle = {
      w: 160,
      h: 5,
      x: this.width / 2 - 100 / 2, // 100 => paddle.w
      y: this.height - 10,
      speed: 15
    };
    this.bricks = [];
    this.ballOn = false;
    this.bricks = createBricks();
  };

  continue = ballIndex => {
    this.balls[ballIndex] = {
      x: this.width / 2 - 1 + 5 * ballIndex, // -1 => move the ball slightly to give him a starting direction
      y: this.height / 2,
      radius: 8,
      speedX: 0,
      speedY: this.props.speed
    };
    // Spawn ball immediately after lost
    this.ballOn = true;
  };

  loop = () => {
    // Movements
    this.move();
    // Drawings
    this.draw(this.ballColor);
    // Looping
    requestAnimationFrame(this.loop);
  };

  animation = loop => {
    requestAnimationFrame(loop);
  };

  move = () => {
    // Paddle movement - only for keyboard inputs
    this.movePaddleWithKeys();
    // Ball movement
    this.moveBall();
  };

  movePaddleWithKeys = () => {
    if (
      (this.keys.isPressed(65) || this.keys.isPressed(37)) &&
      this.paddle.x > 0
    ) {
      // Left
      this.paddle.x -= this.paddle.speed;
    } else if (
      (this.keys.isPressed(68) || this.keys.isPressed(39)) &&
      this.paddle.x + this.paddle.w < this.width
    ) {
      // Right
      this.paddle.x += this.paddle.speed;
    }
    // Start game with space key
    if (this.keys.isPressed(32) && this.ballOn === false) {
      this.ballOn = true;
      this.gameOver = 0;
      this.interval = setInterval(this.triggerAdaptation, ADAPTION_INTERVAL);
    }
  };

  moveBall = () => {
    for (let i = 0; i < this.ballCount; i++) {
      if (this.ballOn === true) {
        this.balls[i].x += this.balls[i].speedX;
        this.balls[i].y += this.balls[i].speedY;
        // Check if ball hit the ceiling
        this.checkCeilingHit(this.balls[i]);
        // Check if ball hit the paddle and consider angle
        this.checkPaddleHit(this.balls[i]);
        // Check if ball hit the wall - left and right
        this.checkWallHit(this.balls[i]);
        // Check for lost
        this.checkLost(this.balls[i], this.height);
        // Destroy brick
        this.destroyBrick(this.balls[i]);
        // Check for win
        this.checkWin(this.bricks);
      }
    }
  };

  checkCeilingHit = ball => {
    if (ball.y <= 0) {
      ball.speedY = -ball.speedY;
    }
  };

  checkWallHit = ball => {
    if (ball.x >= this.width || ball.x <= 0) {
      ball.speedX = -ball.speedX;
    }
  };

  checkPaddleHit = ball => {
    if (
      ball.y + ball.radius >= this.paddle.y - BALL_OFFSET &&
      ball.x - ball.radius >= this.paddle.x - BALL_OFFSET &&
      ball.x + ball.radius <= this.paddle.x + this.paddle.w + BALL_OFFSET
    ) {
      ball.speedY = -ball.speedY;
      const angle = ball.x - (this.paddle.x + this.paddle.w / 2);
      ball.speedX = angle * 0.13;
    }
  };

  checkLost = (ball, height) => {
    if (ball.y > height) {
      this.setState({ losses: this.state.losses + 1 });
      const ballIndex = this.balls.indexOf(ball);
      this.continue(ballIndex);
    }
  };

  checkWin = bricks => {
    if (bricks.length < 1) {
      // Generate new bricks and go on
      this.bricks = createBricks();
      this.continue();
    }
  };

  draw = ballColor => {
    // Game
    this.drawGame();
    // Paddle
    this.drawPaddle();
    // Text
    this.drawStartText();
    // Ball
    this.drawBall(ballColor);
    // Bricks
    this.drawBricks();
  };

  drawGame = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  drawPaddle = () => {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.w,
      this.paddle.h
    );
  };

  drawStartText = () => {
    if (this.ballOn === false) {
      this.ctx.font = "18px Roboto Mono";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "Tab the screen to start a new game.",
        this.width / 2,
        this.height / 2 - 20
      );
      this.ctx.font = "12px Roboto Mono";
      this.ctx.fillText(
        "Move the paddle by sliding your finger over the screen.",
        this.width / 2,
        this.height / 2 + 20
      );
    }
  };

  drawBall = ballColor => {
    // Draw balls according to ballCount
    for (let i = 0; i < this.ballCount; i++) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.balls[i].x,
        this.balls[i].y,
        this.balls[i].radius,
        0,
        Math.PI * 2
      );
      this.ctx.fillStyle = ballColor;

      this.ctx.fill();
    }
  };

  drawBricks = () => {
    for (let i = 0; i < this.bricks.length; i++) {
      this.ctx.fillStyle = this.bricks[i].color;
      this.ctx.fillRect(
        this.bricks[i].x,
        this.bricks[i].y,
        this.bricks[i].w,
        this.bricks[i].h
      );
    }
  };

  destroyBrick = () => {
    for (var i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.ballCount; j++) {
        if (checkCollision(this.balls[j], this.bricks[i])) {
          this.balls[j].speedY = -this.balls[j].speedY;
          this.bricks.splice(i, 1);
          this.setState({ brickCount: this.state.brickCount + 1 });
          if (this.props.adaptationDimension === "Incentives") {
            // Add points and trigger incentive
            this.setState(
              {
                points: this.state.points + this.incentives,
                isIncentiveActive: true
              },
              () => {
                setTimeout(() => {
                  this.setState({ isIncentiveActive: false });
                }, 1000);
              }
            );
          }
        }
      }
    }
  };

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Canvas
          width={this.props.theme.game.width}
          height={this.props.theme.game.height}
          id="gameCanvas"
          userId={this.props.userId}
        />
        <DashBoard
          dimension={this.props.adaptationDimension}
          points={this.state.points}
        />
        <Incentive active={this.state.isIncentiveActive}>
          + {this.incentives}
        </Incentive>
      </div>
    );
  }
}

export default withTheme(Game);
