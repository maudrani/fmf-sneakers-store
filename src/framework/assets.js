import wall2 from "../Assets/IMG/Background/concrete-wall.png";
import wall3 from "../Assets/IMG/Background/french-stucco.png";
import wall1 from "../Assets/IMG/Background/white-wall.png";
import graffiti from "../Assets/IMG/Background/graffiti.svg";
import styled from "styled-components";
import styledMap from "styled-map";
import * as values from "./global";

const { colors, sizes, weights, width, height, fonts } = values;
const flex = values.flexShortcuts;

//Dynamic General Configs to append in components
const MarginAndPaddingConfig = {
  "padding-left": styledMap("pw", { ...sizes, default: "0px" }),
  "margin-left": styledMap("mw", { ...sizes, default: "0px" }),

  "padding-right": styledMap("pw", { ...sizes, default: "0px" }),
  "margin-right": styledMap("mw", { ...sizes, default: "0px" }),

  "padding-top": styledMap("ph", { ...sizes, default: "0px" }),
  "margin-top": styledMap("mh", { ...sizes, default: "0px" }),

  "padding-bottom": styledMap("ph", { ...sizes, default: "0px" }),
  "margin-bottom": styledMap("mh", { ...sizes, default: "0px" }),
};

const WidthHeight = {
  width: styledMap(width),
  height: styledMap(height),
};

const BackgroundConfig = {
  "background-color": styledMap("bg", { ...colors, default: "none" }),
  "background-image": styledMap("bg-image", {
    default: "none",
    graffiti: `url(${graffiti})`,
    wall: `url(${wall2}), url(${wall3})`,
    wall1: `url(${wall2})`,
    wall2: `url(${wall3})`,
    wall3: `url(${wall1})`,
    "wall-graffiti": `url(${wall2}), url(${wall3}) , url(${graffiti})`,
  }),
};

const BorderConfig = {
  "border-radius": styledMap("b-radius", {
    ...sizes,
    circular: "50%",
    semi: "5vh",
    default: 0,
  }),
};

const FlexConfigs = {
  display: "flex",
  "flex-direction": styledMap("direction", flex["flex-direction"]),
  "background-color": styledMap({ ...colors, default: "none" }),
  "justify-content": styledMap("justify", flex["justify-content"]),
  "align-items": styledMap("align", flex["align-items"]),
};
const FontConfig = {
  color: styledMap(colors),
  "font-family": styledMap(fonts),
  "font-weight": styledMap("weight", weights),
  "font-size": styledMap(sizes),
};

const Shadows = {
  "box-shadow": styledMap("b-shadow", {
    default: "none",
    1: `rgba(149, 157, 165, 0.2) 0px 8px 24px;`,
    2: ` 0 1px 1px rgba(0,0,0,0.08), 
    0 2px 2px rgba(0,0,0,0.08), 
    0 4px 4px rgba(0,0,0,0.08), 
    0 8px 8px rgba(0,0,0,0.08),
    0 16px 16px rgba(0,0,0,0.08);`,
    3: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`,
    4: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
    5: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;`,
    6: `rgba(0, 0, 0, 0.2) 0px 20px 30px;`,
    7: `0 1px 2px rgba(0,0,0,0.07), 
    0 2px 4px rgba(0,0,0,0.07), 
    0 4px 8px rgba(0,0,0,0.07), 
    0 8px 16px rgba(0,0,0,0.07),
    0 16px 32px rgba(0,0,0,0.07), 
    0 32px 64px rgba(0,0,0,0.07);`,
  }),

  filter: styledMap("d-shadow", {
    default: "none",
    1: `drop-shadow(0px 8px 11px rgba(28,28,28,0.52))`,
    2: `drop-shadow(0px 26px 11px rgba(28,28,28,0.52))`,
    3: `drop-shadow(0px 3px 11px rgba(28,28,28,0.52))`,
    4: `drop-shadow(0px 8px 23px rgba(28,28,28,0.52))`,
    5: `drop-shadow(0px 26px 23px rgba(28,28,28,0.52))`,
    6: `drop-shadow(0px 3px 23px rgba(28,28,28,0.52))`,
    7: `drop-shadow(0px 18px 13px rgba(28,28,28,0.36))`,
  }),
};

const HoverConfigs = {
  transition: "0.15s;",
  color: styledMap("hover-color", { ...colors, default: "inset" }),
  "background-color": styledMap("hover-bg", { ...colors, default: "inset" }),
  transform: styledMap("hover-scale", {
    sm: "scale(1.05)",
    md: "scale(1.1)",
    lg: "scale(1.2)",
    default: "",
  }),
  "box-shadow": styledMap("hover-shadow", {
    default: "inset",
    1: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  }),
};

//Components
const Text = styled.span`
  ${WidthHeight}
  ${BackgroundConfig}
  ${MarginAndPaddingConfig}
  ${FontConfig}
  ${Shadows}
`;

const Link = styled(Text)`
  cursor: pointer;
  transition: 0.15s;
  :hover {
    ${HoverConfigs}
  }
`;

const Button = styled.button`
  ${WidthHeight}
  ${BackgroundConfig}
  ${BorderConfig}
  ${MarginAndPaddingConfig}
  ${FontConfig}
  ${Shadows}

  cursor: pointer;
  border: none;
  transition: 0.15s;

  :hover {
    ${HoverConfigs}
  }
`;

const Container = styled.div`
  ${WidthHeight}
  ${BackgroundConfig}
  ${BorderConfig}
  ${FlexConfigs}
  ${MarginAndPaddingConfig}
  ${Shadows}

  transition: all 0.15s;

  :hover {
    ${HoverConfigs}
  }
`;

const Img = styled.img`
  ${Shadows}
  ${WidthHeight}
  ${MarginAndPaddingConfig}

  transition: all 0.15s;

  :hover {
    ${HoverConfigs}
  }
`;

const Input = styled.input`
  ${WidthHeight}
  ${BackgroundConfig}
  ${MarginAndPaddingConfig}
  ${FontConfig}
  ${Shadows}
  ${BorderConfig}

  border:0;
  background:transparent;
  border-bottom:1px solid ${colors.whitesmoke};

  transition: all 0.15s;

  :hover {
    ${HoverConfigs}
  }
`;

export { Container, Text, Link, Button, Img, Input };
