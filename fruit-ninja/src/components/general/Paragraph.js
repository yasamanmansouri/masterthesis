//  

import styled from "styled-components";

const paragraph = styled.span`
  display: ${props => (props.inline ? "inline-block" : "block")};
  font-size: 18px;
  color: black;
  margin: 0 1rem 1rem 0.5rem;
  font-weight: ${props => (props.bold ? "bold" : "")};
`;

export default paragraph;
