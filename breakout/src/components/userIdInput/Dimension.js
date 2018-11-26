//  

import styled from "styled-components";

const dimension = styled.div`
  display: inline-block;
  font-size: 24px;
  font-weight: ${props => (props.selected ? "bold" : "")};
  text-decoration: ${props => (props.selected ? "underline" : "")};
  margin: 1rem;
  cursor: pointer;
`;

export default dimension;
