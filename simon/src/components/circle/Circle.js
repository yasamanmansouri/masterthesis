//  

import styled from "styled-components";

const circle = styled.div`
  display: inline-block;
  background-color: ${props =>
    props.active ? props.theme.highlightColor : props.color};
  height: ${props => props.size};
  width: ${props => props.size};
  margin: ${props => props.margin};
  border-radius: 50%;
  cursor: pointer;
  opacity: ${props => (props.opacity ? props.opacity : "")};
`;

export default circle;
