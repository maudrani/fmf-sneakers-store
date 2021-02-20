import wall2 from "../Assets/IMG/Background/concrete-wall.png";
import wall3 from "../Assets/IMG/Background/french-stucco.png";
import wall1 from "../Assets/IMG/Background/white-wall.png";
import graffiti from "../Assets/IMG/Background/graffiti.svg";
import city from "../Assets/IMG/Background/city.svg";
import styled from "styled-components";
import styledMap from "styled-map";
import * as values from "./global";

const { colors, sizes, weights, width, height, fonts, device } = values;
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
    city: `url(${city})`,
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
  color: styledMap({ ...colors, default: colors.black }),
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
    "inset-1": "inset 0px 0px 52px -22px rgba(0,0,0,0.75);",
    "inset-2": "inset 0px 47px 52px -22px rgba(0,0,0,0.75);",
    "inset-3": "inset 0px 0px 101px -22px rgba(0,0,0,0.75);",
    "inset-4": "inset 0px 0px 131px -22px rgba(0,0,0,0.85);",
    "inset-5": "inset 0px 0px 36px -21px rgba(29,29,29,1);",
    "inset-6": "inset 0px 0px 7px 0px rgba(0,0,0,0.22);",
    8: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
    9: "0px 0px 7px 0px rgba(0,0,0,0.22);",
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
    8: "drop-shadow(0 10px 10px rgba(0,0,0,0.22))",
  }),
};
const HoverConfigs = {
  color: styledMap("hover-color", { ...colors, default: "inset" }),
  "background-color": styledMap("hover-bg", { ...colors, default: "inset" }),
  transform: styledMap("hover-scale", {
    xs: "scale(1.01)",
    sm: "scale(1.05)",
    md: "scale(1.1)",
    lg: "scale(1.2)",
    default: "",
  }),
  "box-shadow": styledMap("hover-shadow", {
    default: "inset",
    1: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  }),
  filter: styledMap("hover-shadow", {
    default: "inset",
    2: `drop-shadow(0px 26px 11px rgba(28,28,28,0.52))`,
    3: `drop-shadow(0px 3px 11px rgba(28,28,28,0.52))`,
    "3-light": `drop-shadow(0px 8px 11px rgba(28,28,28,0.15))`,
    4: `drop-shadow(0px 8px 23px rgba(28,28,28,0.52))`,
    5: `drop-shadow(0px 26px 23px rgba(28,28,28,0.52))`,
    6: `drop-shadow(0px 3px 23px rgba(28,28,28,0.52))`,
    7: `drop-shadow(0px 18px 13px rgba(28,28,28,0.36))`,
    8: `drop-shadow(0px 8px 11px rgba(28,28,28,0.52))`,
  }),
  opacity: styledMap("hover-opacity", { 0: "0", 50: "0.5", 100: "1" }),
};

const Scale = {
  transform: styledMap("transform-scale", {
    xs: "scale(1.01)",
    sm: "scale(1.05)",
    md: "scale(1.1)",
    lg: "scale(1.2)",
    default: "",
  }),
};

//Components
const Text = styled.span`
  will-change: transform;
  ${WidthHeight}
  ${Scale}
  ${BackgroundConfig}
  ${MarginAndPaddingConfig}
  ${FontConfig}
  ${Shadows}

  :hover {
    ${HoverConfigs}
  }

  @media ${device.xs} {
    font-size: ${styledMap("xs-size", {
      ...sizes,
      default: "inset",
    })};
  }
  @media ${device.sm} {
    font-size: ${styledMap("sm-size", {
      ...sizes,
      default: "inset",
    })};
  }
  @media ${device.md} {
    font-size: ${styledMap("md-size", {
      ...sizes,
      default: "inset",
    })};
  }
  @media ${device.lg} {
    font-size: ${styledMap("lg-size", {
      ...sizes,
      default: "inset",
    })};
  }
`;

const Button = styled.button`
  will-change: transform;
  background-color: transparent;
  min-height: 2.5rem;
  min-width: 5.6rem;

  ${WidthHeight}
  ${Scale}
  ${BackgroundConfig}
  ${BorderConfig}
  ${MarginAndPaddingConfig}
  ${FontConfig}
  ${Shadows}

  cursor: pointer;
  border: none;

  :hover {
    ${HoverConfigs}
  }

  @media ${device.sm} {
    cursor: default;
  }
`;

const Container = styled.div`
  -webkit-transform: translateZ(0.1px);
  -moz-transform: translateZ(0.1px);
  -o-transform: translateZ(0.1px);
  -ms-transform: translateZ(0.1px);
  transform: translateZ(0.1px);
  * {
    -webkit-transform: translateZ(0.1px);
    -moz-transform: translateZ(0.1px);
    -o-transform: translateZ(0.1px);
    -ms-transform: translateZ(0.1px);
    transform: translateZ(0.1px);
  }

  will-change: ${styledMap("optimize-scroll", {
    none: "none",
    default: "transform",
  })};
  ${WidthHeight}
  ${Scale}
  ${BackgroundConfig}
  ${BorderConfig}
  ${FlexConfigs}
  ${MarginAndPaddingConfig}
  ${Shadows}

  @media ${device.xs} {
    flex-direction: ${styledMap("xs-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("xs-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("xs-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("xs-w", { ...width, default: "inset" })};
    height: ${styledMap("xs-h", { ...height, default: "inset" })};
  }
  @media ${device.sm} {
    flex-direction: ${styledMap("sm-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("sm-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("sm-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("sm-w", { ...width, default: "inset" })};
    height: ${styledMap("sm-h", { ...height, default: "inset" })};
  }
  @media ${device.md} {
    flex-direction: ${styledMap("md-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("md-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("md-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("md-w", { ...width, default: "inset" })};
    height: ${styledMap("md-h", { ...height, default: "inset" })};
  }
  @media ${device.lg} {
    flex-direction: ${styledMap("lg-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("lg-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("lg-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("lg-w", { ...width, default: "inset" })};
    height: ${styledMap("lg-h", { ...height, default: "inset" })};
  }

  :hover {
    ${HoverConfigs}
  }
`;

const Img = styled.img`
  will-change: transform;
  ${Shadows}
  ${WidthHeight}
  ${Scale}
  ${MarginAndPaddingConfig}


  :hover {
    ${HoverConfigs}
  }
`;

const Input = styled.input`
  ${WidthHeight}
  ${Scale}
  ${BackgroundConfig}
  ${MarginAndPaddingConfig}
  ${FontConfig}
  ${Shadows}
  ${BorderConfig}

  ::placeholder {
    ${FontConfig}
  }

  border: 0;
  background: transparent;
  border-bottom: 1px solid
    ${styledMap("border-color", {
      ...colors,
      default: colors.black,
    })};

  @media ${device.xs} {
    flex-direction: ${styledMap("xs-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("xs-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("xs-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("xs-w", { ...width, default: "inset" })};
    height: ${styledMap("xs-h", { ...height, default: "inset" })};
  }
  @media ${device.sm} {
    flex-direction: ${styledMap("sm-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("sm-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("sm-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("sm-w", { ...width, default: "inset" })};
    height: ${styledMap("sm-h", { ...height, default: "inset" })};
  }
  @media ${device.md} {
    flex-direction: ${styledMap("md-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("md-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("md-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("md-w", { ...width, default: "inset" })};
    height: ${styledMap("md-h", { ...height, default: "inset" })};
  }
  @media ${device.lg} {
    flex-direction: ${styledMap("lg-direction", {
      ...flex["flex-direction"],
      default: "inset",
    })};

    justify-content: ${styledMap("lg-justify", {
      ...flex["justify-content"],
      default: "inset",
    })};

    align-items: ${styledMap("lg-align", {
      ...flex["align-items"],
      default: "inset",
    })};

    width: ${styledMap("lg-w", { ...width, default: "inset" })};
    height: ${styledMap("lg-h", { ...height, default: "inset" })};
  }

  :hover {
    ${HoverConfigs}
  }
`;

const Select = styled.select`
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;

  ${WidthHeight}
  ${Scale}
  ${BackgroundConfig}
  ${MarginAndPaddingConfig}
  ${FontConfig}
  ${Shadows}
  ${BorderConfig}

  background: transparent;

  border: 0px;

  border-bottom: 1px solid
    ${styledMap("border-color", {
      ...colors,
    })};

  cursor: pointer;

  :hover {
    ${HoverConfigs}
  }
`;

const Configs = {
  HoverConfigs: HoverConfigs,
};

export { Container, Text, Button, Img, Input, Select, Configs };
