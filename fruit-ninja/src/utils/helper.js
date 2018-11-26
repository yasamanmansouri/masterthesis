export const getTime = (start, end) => {
  return (end - start) / 1000;
};

export const getOpacity = (round, rollback) => {
  switch (round) {
    case 1:
      return 1;
    case 2:
      return 0.9;
    case 3:
      if (rollback) {
        return 0.9;
      }
      return 0.8;
    case 4:
      if (rollback) {
        return 0.8;
      }
      return 0.7;
    case 5:
      if (rollback) {
        return 0.7;
      }
      return 0.6;
    case 6:
      if (rollback) {
        return 0.6;
      }
      return 0.5;
    case 7:
      if (rollback) {
        return 0.5;
      }
      return 0.4;
    case 8:
      if (rollback) {
        return 0.4;
      }
      return 0.3;
    case 9:
      if (rollback) {
        return 0.3;
      }
      return 0.2;
    case 10:
      if (rollback) {
        return 0.2;
      }
      return 0.1;

    default:
      return 1;
  }
};

export const getAdaptationScore = (hits, misses) => {
  return hits - misses * 2;
};

export const getIncentives = (round, rollback) => {
  if (!rollback) {
    return (round + 1) * 10;
  } else {
    return (round + 1) * 10 - 15;
  }
};

export const getSpeed = (round, rollback) => {
  switch (round) {
    case 1:
      return 3;
    case 2:
      return 2.7;
    case 3:
      if (rollback) {
        return 3;
      }
      return 2.4;
    case 4:
      if (rollback) {
        return 2.7;
      }
      return 2.1;
    case 5:
      if (rollback) {
        return 2.4;
      }
      return 1.8;
    case 6:
      if (rollback) {
        return 2.1;
      }
      return 1.5;
    case 7:
      if (rollback) {
        return 1.8;
      }
      return 1.2;
    case 8:
      if (rollback) {
        return 1.5;
      }
      return 0.9;
    case 9:
      if (rollback) {
        return 1.2;
      }
      return 0.6;
    case 10:
      if (rollback) {
        return 0.9;
      }
      return 0.3;
    default:
      return 2.5;
  }
};

const createCoordinates = () => {
  const step = 100;
  let array = [];
  for (let i = 0; i < 13; i++) {
    array.push(i * step);
  }
  return array;
};

export const getCoordinates = elements => {
  const possibleCoordinates = createCoordinates();
  let coordinates = [];

  for (let i = 0; i < elements.length; i++) {
    let index = Math.floor(Math.random() * 13);
    if (coordinates.indexOf(possibleCoordinates[index]) !== -1) {
      index = Math.floor(Math.random() * 13);
    }
    coordinates.push(possibleCoordinates[index]);
  }
  return coordinates;
};
