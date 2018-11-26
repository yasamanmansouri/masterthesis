import React from "react";

import Square from "../components/square/Square.jsx";

// Constants
import { theme } from "../constants/Theme.js";

export const generateID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export const createElements = numberToCreate => {
  let elements = [];
  let i = 0;
  for (i = 0; i < numberToCreate; i++) {
    elements.push(
      <Square
        active={false}
        key={generateID()}
        color="#373242"
        // This will generate circles of random color
        // color={
        //   theme.baseColors[
        //     Object.keys(theme.baseColors)[Math.floor(Math.random() * 6)]
        //   ]
        // }
        size={theme.sizes.xl}
        // This will generate circles of random size
        // size={
        //   theme.sizes[Object.keys(theme.sizes)[Math.floor(Math.random() * 4)]]
        // }
        margin={theme.margin.large}
        // This will generate circles with random margin
        // margin={
        //   theme.margin[
        //     Object.keys(theme.margin)[Math.floor(Math.random() * 3)]
        //   ]
        // }
      />
    );
  }
  return elements;
};

/*
import Square from "../components/square/Square.jsx";
If we want to create a Square element use:
<Square
  active={false}
  key={generateID()}
  color={
    theme.baseColors[
      Object.keys(theme.baseColors)[Math.floor(Math.random() * 6)]
    ]
  }
  size={theme.sizes.xl}
  // This will generate squares of random size
  // size={
  //   theme.sizes[Object.keys(theme.sizes)[Math.floor(Math.random() * 4)]]
  // }
  margin={theme.margin.large}
  // This will generate squares with random margin
  // margin={
  //   theme.margin[
  //     Object.keys(theme.margin)[Math.floor(Math.random() * 3)]
  //   ]
  // }
/>

Also we can generate them randomly with:
if (Math.floor(Math.random() * 2) === 0) {
  elements.push(<Circle.../>)
} else {
  elements.push(<Square.../>)
}

*/
