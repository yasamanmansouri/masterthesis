import styled, { keyframes } from "styled-components";

const show = keyframes`
  0% {
    font-size: 0px;
  }

  100% {
    font-size: 40px;
    opacity: 1;
  }
`;

const Incentive = styled.div`
  opacity: 0;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
  line-height: 8rem;
  text-align: center;
  vertical-align: middle;
  animation: ${props => (props.active ? `${show} 0.5s linear` : "")};
`;

export default Incentive;
