import styled from "styled-components";

const square = styled.div`
  display: inline-block;
  background-color: ${props => (props.active ? "#fff" : "#FF1C1C")};
  height: ${props => props.size};
  width: ${props => props.size};
  margin: ${props => props.margin};
  border: 2px solid black;
  border-radius: 10px
  &:hover {
    cursor: pointer;
  }
`;

export default square;
