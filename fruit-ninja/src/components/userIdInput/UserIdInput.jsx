import React, { Component } from "react";

// Styled componets
import UserIdInputComp from "./UserIdInput.js";
import Input from "../general/Input.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";
import BlockContainer from "../general/BlockContainer.js";
import Button from "../general/Button.js";
import Dimension from "./Dimension.js";

const ADAPTATION_DIMENSIONS = [
  "Speed",
  "Object clarity",
  "Content",
  "Incentives"
];

class UserIdInput extends Component {
  state = {
    inputValue: "",
    selectedDimension: "Speed"
  };
  onTextinputChange = (event: Event) => {
    const newInput = event.target.value;
    this.setState({
      inputValue: newInput
    });
  };

  onSubmit() {
    this.props.onStart(this.state.inputValue, this.state.selectedDimension);
  }

  selectDimension(dimension) {
    this.setState({ selectedDimension: dimension });
  }

  render() {
    if (!this.props.userId) {
      return (
        <UserIdInputComp>
          <Title>Fruit Ninja</Title>
          <BlockContainer>
            <Paragraph>Please enter a user id:</Paragraph>
            <Input
              onChange={this.onTextinputChange}
              value={this.state.inputValue}
              placeholder="Enter ID"
              autoFocus
            />
          </BlockContainer>
          <BlockContainer margin="4rem 0 0 0">
            {ADAPTATION_DIMENSIONS.map((dimension, index) => (
              <Dimension
                key={index}
                selected={this.state.selectedDimension === dimension}
                onClick={() => this.selectDimension(dimension)}
              >
                {dimension}
              </Dimension>
            ))}
          </BlockContainer>
          <BlockContainer margin="4rem 0 0 0">
            <Button onClick={() => this.onSubmit()}>Start!</Button>
          </BlockContainer>
        </UserIdInputComp>
      );
    } else return null;
  }
}

export default UserIdInput;
