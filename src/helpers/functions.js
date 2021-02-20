const scrollTopSmooth = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollTop = () => {
  window.scrollTo(0, 0);
};

const randomizeArray = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const ProductRoute = (product) => {
  let route = `sneaker:${product.category}/${product.name}`
    .toLowerCase()
    .replace(/ /g, "-");

  return route;
};

const CartProductRoute = (product) => {
  let route = `${ProductRoute(product)}` /* optional:  /${product._id} */
    .toLowerCase()
    .replace(/ /g, "-");
  return route;
};

const IsMobile = () => {
  let isMobile = false;
  if (window.innerWidth <= 768) {
    isMobile = "true";
  }
  return isMobile;
};

const MaxWidth = (width) => {
  let Result = false;
  if (window.innerWidth <= width) {
    Result = true;
  }
  return Result;
};

const Capitalize = (value) => {
  let capitalized = value;
  capitalized = capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
  return capitalized;
};

const ObtainDate = () => {
  const today = new Date();
  const date =
    today.getDate() +
    "-" +
    (today.getMonth() + 1 < 10 ? "0" : "") +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  return date;
};
const ObtainTime = () => {
  const today = new Date();
  const time =
    (today.getHours() < 10 ? "0" : "") +
    today.getHours() +
    ":" +
    ((today.getMinutes() < 10 ? "0" : "") + today.getMinutes());
  return time;
};

export {
  scrollTop,
  scrollTopSmooth,
  randomizeArray,
  ProductRoute,
  CartProductRoute,
  IsMobile,
  Capitalize,
  MaxWidth,
  ObtainDate,
  ObtainTime,
};
