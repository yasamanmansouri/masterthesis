//  

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
  color: white;
  margin: auto;
  cursor: pointer;
  line-height: 8rem;
  text-align: center;
  vertical-align: middle;
  animation: ${show} 0.5s linear;
`;

export default Incentive;
