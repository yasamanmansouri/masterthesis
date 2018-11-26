//  

import styled from "styled-components";

const input = styled.input`
  display: block;
  border-radius: 5px;
  border: 1px solid black;
  margin: auto;
  height: 2rem;
  font-size: 18px;
  width: 6rem;

  ::placeholder {
    color: black;
    padding-left: 0.1rem;
  }

  :focus {
    outline: none;
  }
`;

export default input;
