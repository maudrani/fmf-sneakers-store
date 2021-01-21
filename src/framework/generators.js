const GenerateSizes = (main, ratio, list) => {
  let defaultSize = main;
  const sizes = {};
  list.forEach((el) => {
    sizes[el] = "";
  });
  for (const size in sizes) {
    sizes[size] = defaultSize + "px";
    defaultSize = defaultSize * ratio;
  }
  return sizes;
};

const GenerateValues = (defaultValue, quantity, prefix, value) => {
  const values = {};
  for (let i = 0; i <= quantity; i++) {
    values[`${prefix}-${i}`] = `${i}${value}`;
  }
  values.default = defaultValue;
  return values;
};

export { GenerateSizes, GenerateValues };
