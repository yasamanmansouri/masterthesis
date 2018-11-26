import styled from "styled-components";

const game = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  display: ${props => (props.userId ? "initial" : "none")}
  -webkit-touch-callout: initial !important;
  -webkit-user-select: initial !important;
  margin: auto;
`;

export default game;
