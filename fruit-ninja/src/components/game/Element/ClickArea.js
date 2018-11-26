import styled, { keyframes } from "styled-components";

const down = keyframes`
  0% {top: ${props => `${props.yCoordinate}px`}}
  100% {top: 55rem}
`;

const element = styled.div`
  width: 100px;
  height: 120px;
  text-align: center;
  top: ${props => `${props.yCoordinate}px`}
  right: ${props => `${props.xCoordinate}px`};
  position: absolute;
  animation: ${props => `${down} ${props.speed}s linear`};
  display: ${props => (props.clicked ? "none" : "block")};
  opacity: ${props => props.opacity};
`;

export default element;
