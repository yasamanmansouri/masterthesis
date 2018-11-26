//  

import styled from "styled-components";

const paragraph = styled.span`
  display: ${props => (props.inline ? "inline-block" : "block")};
  font-size: ${props => (props.fontSize ? props.fontSize : "18px")};
  color: black;
  margin: 0 1rem 1rem 0.5rem;
`;

export default paragraph;
