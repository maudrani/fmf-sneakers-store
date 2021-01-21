import styled from "styled-components";
import styledMap from "styled-map";
import * as values from "./global";

const { colors, sizes, weights, width, height, fonts } = values;
const flex = values.flexShortcuts;

//Dynamic General Configs to append in components
const GeneralConfigs = {
  width: styledMap(width),
  height: styledMap(height),

  "padding-left": styledMap("p-w", { ...sizes, default: "0px" }),
  "margin-left": styledMap("m-w", { ...sizes, default: "0px" }),

  "padding-right": styledMap("p-w", { ...sizes, default: "0px" }),
  "margin-right": styledMap("m-w", { ...sizes, default: "0px" }),

  "padding-top": styledMap("p-h", { ...sizes, default: "0px" }),
  "margin-top": styledMap("m-h", { ...sizes, default: "0px" }),

  "padding-bottom": styledMap("p-h", { ...sizes, default: "0px" }),
  "margin-bottom": styledMap("m-h", { ...sizes, default: "0px" }),

  "background-color": styledMap("bg", { ...colors, default: "none" }),

  "border-radius": styledMap("b-radius", {
    ...sizes,
    circular: "50%",
    side: "5vh",
    default: 0,
  }),
};

//Components
const Text = styled.h1`
  ${GeneralConfigs}
  color: ${styledMap(colors)};
  font-family: ${styledMap(fonts)};
  font-weight: ${styledMap(weights)};
  font-size: ${styledMap(sizes)};
`;

const Link = styled(Text)`
  cursor: pointer;
  transition: 0.2s;
  :hover {
    color: ${styledMap("hover-color", colors)};
  }
`;

const Container = styled.div`
  ${GeneralConfigs}
  display: flex;
  flex-direction: ${styledMap("direction", flex["flex-direction"])};
  background-color: ${styledMap({ ...colors, default: "none" })};
  justify-content: ${styledMap("justify", flex["justify-content"])};
  align-items: ${styledMap("align", flex["align-items"])};
`;

export { Container, Text, Link };
