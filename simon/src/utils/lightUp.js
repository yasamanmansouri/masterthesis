//

export const createPattern = (patternSize, elements) => {
  let availiableElements = elements;
  let pattern = [];
  let i = 0;
  for (i = 0; i < patternSize; i++) {
    const element =
      availiableElements[
        Object.keys(availiableElements)[
          Math.floor(Math.random() * availiableElements.length)
        ]
      ].key;
    let remainingElements = [];
    availiableElements.map(x => {
      if (x.key !== element) {
        remainingElements.push(x);
      }
    });
    availiableElements = remainingElements;
    pattern.push(element);
  }
  return pattern;
};

export const getNewSpeed = (currentSpeed, rollback) => {
  const linearStepSize = 300;
  if (!rollback) {
    // Preventing nevative speed
    if (currentSpeed - linearStepSize > 0) {
      return currentSpeed - linearStepSize;
    } else {
      // Do not reduce speed if speed is 75ms
      if (currentSpeed === 150) return currentSpeed;
      currentSpeed / 2;
    }
  } else {
    return currentSpeed + linearStepSize / 2;
  }
};

export const getNewOpacity = (currentOpacity, rollback) => {
  const linearStepSize = 0.1;
  if (!rollback) {
    // Preventing nevative opacity
    if (currentOpacity - linearStepSize > 0) {
      return currentOpacity - linearStepSize;
    } else {
      // Do not reduce opacity if opacity is 0.1
      if (currentOpacity === 0.1) return currentOpacity;
      currentOpacity / 2;
    }
  } else {
    return currentOpacity + linearStepSize / 2;
  }
};

export const getNewPoints = (currentPoints, rollback) => {
  const linearStepSize = 10;
  if (!rollback) {
    return currentPoints + linearStepSize;
  } else {
    return currentPoints - linearStepSize / 2;
  }
};

export const getNewPatternLength = (currentPatternLength, rollback) => {
  if (!rollback) {
    return currentPatternLength + 1;
  } else {
    return currentPatternLength - 1;
  }
};
