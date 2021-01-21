import { createGlobalStyle } from "styled-components";
import values from "./values.json";
import { GenerateSizes, GenerateValues } from "./generators";

let { main, ratio } = values.sizes;

const { colors } = values;
const fonts = { main: "Macbeth Reguler", secondary: "Lato" };
const sizes = {
  ...GenerateSizes(main, ratio, values.sizes.sizes),
  default: `${main}px`,
};
const weights = {
  default: 400,
  thin: 100,
  "extra-light": 200,
  light: 300,
  regular: 400,
  medium: 500,
  "semi-bold": 600,
  bold: 700,
  "extra-bold": 800,
  black: 900,
};

let width = GenerateValues("auto", 100, "w", "%");
let height = GenerateValues("auto", 100, "h", "vh");

const flexShortcuts = {
  "flex-direction": {
    r: "row",
    rr: "row-reverse",
    c: "column",
    cr: "column-reverse",
    default: "row",
  },
  "justify-content": {
    c: "center",
    fs: "flex-start",
    fe: "flex-end",
    sb: "space-between",
    sa: "space-around",
    default: "center",
  },
  "align-items": {
    n: "normal",
    fs: "flex-start",
    fe: "flex-end",
    c: "center",
    s: "start",
    e: "end",
    b: "baseline",
    st: "stretch",
    default: "center",
  },
};

/* Global Parameters */
const GlobalStyle = createGlobalStyle`

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
  color: ${colors.black}
}

/* Set core body defaults */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background-color: ${colors.whitesmoke};
}

/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

`;

export {
  GlobalStyle,
  colors,
  sizes,
  weights,
  flexShortcuts,
  width,
  height,
  fonts,
};
