import { createGlobalStyle } from "styled-components";
import values from "./values.json";
import { GenerateSizes, GenerateValues } from "./generators";
import Reis from "../Assets/Fonts/Reis/REIS-Regular.otf";

import RobotoThin from "../Assets/Fonts/Roboto/Roboto-Thin.ttf";
import RobotoLight from "../Assets/Fonts/Roboto/Roboto-Light.ttf";
import RobotoRegular from "../Assets/Fonts/Roboto/Roboto-Regular.ttf";
import RobotoMedium from "../Assets/Fonts/Roboto/Roboto-Medium.ttf";
import RobotoBold from "../Assets/Fonts/Roboto/Roboto-Bold.ttf";
import RobotoBlack from "../Assets/Fonts/Roboto/Roboto-Medium.ttf";

let { main, ratio } = values.sizes;

const { colors } = values;

const fonts = {
  main: "REIS",
  secondary: "Lato",
  third: "Playfair Display",
  fourth: "Roboto",
  default: "Roboto",
};
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

let width = {
  ...GenerateValues("auto", 100, "w", "%"),
  ...GenerateValues("auto", 100, "vw", "vw"),
};
let height = {
  ...GenerateValues("auto", 100, "h", "%"),
  ...GenerateValues("auto", 100, "vh", "vh"),
};

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

const size = {
  xs: "480px",
  sm: "768px",
  md: "990px",
  lg: "1400px",
};
const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  lg: `(max-width: ${size.lg})`,
};

/* Global Parameters */
const GlobalStyle = createGlobalStyle`


/* Locomotive Scroll */

/*! locomotive-scroll v4.1.1 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
html.has-scroll-smooth {
  overflow: hidden; }

html.has-scroll-dragging {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; }

.has-scroll-smooth body {
  overflow: hidden; }

.has-scroll-smooth [data-scroll-container] {
  min-height: 100vh; }

[data-scroll-direction="horizontal"] [data-scroll-container] {
  height: 100vh;
  display: inline-block;
  white-space: nowrap; }

[data-scroll-direction="horizontal"] [data-scroll-section] {
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  height: 100%; }

.c-scrollbar {
  position: absolute;
  right: 0;
  top: 0;
  width: 11px;
  height: 100%;
  transform-origin: center right;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0; }
  .c-scrollbar:hover {
    transform: scaleX(1.45); }
  .c-scrollbar:hover, .has-scroll-scrolling .c-scrollbar, .has-scroll-dragging .c-scrollbar {
    opacity: 1; }
  [data-scroll-direction="horizontal"] .c-scrollbar {
    width: 100%;
    height: 10px;
    top: auto;
    bottom: 0;
    transform: scaleY(1); }
    [data-scroll-direction="horizontal"] .c-scrollbar:hover {
      transform: scaleY(1.3); }

.c-scrollbar_thumb {
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  width: 7px;
  border-radius: 10px;
  margin: 2px;
  cursor: -webkit-grab;
  cursor: grab; }
  .has-scroll-dragging .c-scrollbar_thumb {
    cursor: -webkit-grabbing;
    cursor: grabbing; }
  [data-scroll-direction="horizontal"] .c-scrollbar_thumb {
    right: auto;
    bottom: 0; }

/* Primary */
@font-face {
    font-family: 'Reis';
    font-display: swap;
    src: local('Reis'), local('Reis'),
        url(${Reis}) format('opentype');
}

/* Secondary */
@font-face {
    font-family: 'Roboto';
    font-display: swap;
    src: local('Roboto'), local('Roboto'),
        url(${RobotoThin}) format('truetype');
    font-weight: 100;
}

@font-face {
    font-family: 'Roboto';
    font-display: swap;
    src: local('Roboto'), local('Roboto'),
        url(${RobotoLight}) format('truetype');
    font-weight: 300;
}

@font-face {
    font-family: 'Roboto';
    font-display: swap;
    src: local('Roboto'), local('Roboto'),
        url(${RobotoRegular}) format('truetype');
    font-weight: 400;
}

@font-face {
    font-family: 'Roboto';
    font-display: swap;
    src: local('Roboto'), local('Roboto'),
        url(${RobotoMedium}) format('truetype');
    font-weight: 500;
}

@font-face {
    font-family: 'Roboto';
    font-display: swap;
    src: local('Roboto'), local('Roboto'),
        url(${RobotoBold}) format('truetype');
    font-weight: 700;
}

@font-face {
    font-family: 'Roboto';
    font-display: swap;
    src: local('Roboto'), local('Roboto'),
        url(${RobotoBlack}) format('truetype');
    font-weight: 900;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  outline: none;
  margin: 0;
  padding: 0;
  transition: transform 0.2s;
  /* transition: all 0.2s; */
}

html {
  height: 100%;
  overflow-y: scroll;
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
  padding: 0;
  font-family: Lato;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  background-color: ${colors.white};
  height:100%;
}

.page {
  min-width: ${document.body.clientWidth - 1}px !important;
  overflow-x: hidden;
  transition: 0s !important;
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
  max-height: 100%;
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
  font-family: Lato;
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
  device,
};
