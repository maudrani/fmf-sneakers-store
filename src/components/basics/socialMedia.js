import React from "react";
import { Container, Img } from "../../framework/assets";
import facebook from "../../Assets/IMG/Social/facebook-white.svg";
import instagram from "../../Assets/IMG/Social/instagram-white.svg";

const Social = ({ socialMedia = 'facebook'}) => {
  switch (socialMedia) {
    case "facebook":
      return (
        <Container w-100>
          <a
            href="https://www.facebook.com/FMF-Sneakers-106709671411797"
            rel="noreferrer"
            target="_blank"
            style={{ width: "100%" }}
          >
            <Img
              alt="socialmedia icon"
              src={facebook}
              w-100
              hover-scale="md"
              
            />
          </a>
        </Container>
      );

      case "instagram":
        return (
          <Container w-100>
            <a
              href="https://www.instagram.com/fmfsneakers/"
              rel="noreferrer"
              target="_blank"
              style={{ width: "100%" }}
            >
              <Img
                alt="socialmedia icon"
                src={instagram}
                w-100
                hover-scale="md"
              />
            </a>
          </Container>
        );

        default: 
        break;
  }
};

export default Social;
