export const levelUp = () => {
  return { type: "SWITCH_LEVEL" };
};

export const textToRemember = e => {
  return { type: "TEXT_REMEMBER", text: e.target.value };
};

export const countMinusOne = () => {
  return { type: "COUNT_MINUS" };
};

export const resetCount = () => {
  return { type: "RESET_COUNT" };
};

export const setClassifier = classifier => {
  return { type: "CLASSIFY", classifier };
};

export const setPrediction = results => {
  return { type: "SET_PREDICTION", predictions: results };
};

export const switchVideo = () => {
  return { type: "SWITCH_VIDEO" };
};

export const setVideo = video => {
  return { type: "SET_VIDEO", video };
};

export const clearPrediction = () => {
  return { type: "CLEAR_PREDICTION" };
};

export const changeView = n => {
  return { type: "CHANGE_VIEW", view: n };
};
