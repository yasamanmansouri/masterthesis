//  

import styled from "styled-components";

const paragraph = styled.span`
  display: ${props => (props.inline ? "inline-block" : "block")};
  font-size: 25px;
  color: black;
  margin: 0 1rem 1rem 0.5rem;
  opacity: 0.7;
  font-weight: ${props => (props.bold ? "bold" : "")};
`;

export default paragraph;
