const scrollTopSmooth = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollTop = () => {
  window.scrollTo(0, 0);
};

const getRandom = (arr, n) => {
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
  let route = `${product.category}/${product.name}`
    .toLowerCase()
    .replace(" ", "-");

  return route;
};

const CartProductRoute = (product) => {
  let route = `${ProductRoute(product)}/${product.id}`
    .toLowerCase()
    .replace(" ", "-");
  return route;
};

const IsMobile = () => {
  let isMobile = false;
  if (window.innerWidth <= 768) {
    isMobile = "true";
  }
  return isMobile;
}

export {
  scrollTop,
  scrollTopSmooth,
  getRandom,
  ProductRoute,
  CartProductRoute,
  IsMobile
};
