import { Img } from "../../framework/assets";
import black from "../../Assets/IMG/Brand/logo-black.svg";
import whitesmoke from "../../Assets/IMG/Brand/logo-whitesmoke.svg";
import red from "../../Assets/IMG/Brand/logo-red.svg";
import yellow from "../../Assets/IMG/Brand/logo-yellow.svg";

import newBR from "../../Assets/IMG/Brand/logo new/new-black-red.svg";
import newBW from "../../Assets/IMG/Brand/logo new/new-black-white.svg";
import newBY from "../../Assets/IMG/Brand/logo new/new-black-yellow.svg";
import newWB from "../../Assets/IMG/Brand/logo new/new-white-black.svg";
import newWR from "../../Assets/IMG/Brand/logo new/new-white-red.svg";
import newYB from "../../Assets/IMG/Brand/logo new/new-yellow-black.svg";

const Logo = ({ color = whitesmoke, attributes, style, className }) => {
  const logoColor = {
    black: black,
    whitesmoke: whitesmoke,
    red: red,
    yellow: yellow,

    "black-red": newBR,
    "black-white": newBW,
    "black-yellow": newBY,
    "white-black": newWB,
    "white-red": newWR,
    "yellow-black": newYB,
  };

  return (
    <Img
      className={className}
      src={logoColor[color]}
      alt="logo"
      {...attributes}
      style={style}
    />
  );
};

export default Logo;
