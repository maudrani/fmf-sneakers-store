import { Img } from "../../framework/assets";
import black from "../../Assets/IMG/Brand/logo-black.svg";
import whitesmoke from "../../Assets/IMG/Brand/logo-whitesmoke.svg";
import red from "../../Assets/IMG/Brand/logo-red.svg";
import yellow from "../../Assets/IMG/Brand/logo-yellow.svg";

const Logo = ({ color = whitesmoke, attributes, style }) => {
  const logoColor = {
    black: black,
    whitesmoke: whitesmoke,
    red: red,
    yellow: yellow,
  };

  return <Img src={logoColor[color]} alt="logo" {...attributes} style={style} />;
};

export default Logo;
