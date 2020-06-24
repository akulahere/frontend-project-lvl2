const makeJson = (diff) => {
  const jsonText = JSON.stringify(diff);
  const jsonWithoutBrackets = jsonText.substring(1, jsonText.length - 1);
  return jsonWithoutBrackets;
};

export default makeJson;
