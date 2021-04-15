import React, { useEffect, useState } from "react";
import { Container, Text } from "../../framework/assets";
import Logo from "../basics/logo";
import styled from "styled-components";
import BascketIcon from "../store/components/e-icon";
import { colors } from "../../framework/global";
import { Link } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import { scrollTop, IsMobile } from "../../helpers/functions";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const Nav = styled(Container)`
  top: 0%;
  z-index: 100;
  background-color: rgba(28, 28, 28, 0.9);

  @media (max-width: 768px) {
    padding: 1rem 1px;
    .navLink {
      padding: 0 10px;
      font-size: 12px;
    }

    .navLogo {
      display: none;
    }
  }

  @media (max-width: 405px) {
    .navLink {
      font-size: 9px;
    }
  }
`;

const Navbar = ({
  fixed = true,
  bgColor,
  textColor,
  textHoverColor,
  style,
  options,
  logoColor,
  links = [],
  showCart = true,
  className,
}) => {
  const [scrolled, setIsScrolling] = useState(false);

  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (fixed) {
        setIsScrolling(true);
        setTimeout(() => {
          setIsScrolling(false);
        }, 600);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fixed]);

  const navLinkConfig = {
    className: "navLink",
    xs: true,
    pw: "xs",
    weight: "regular",
    "hover-scale": "md",
    "hover-color": textHoverColor || "yellow",
    style: { ...{ cursor: "pointer" } },
  };

  const bgColors = { ...colors, default: "rgba(0,0,0,0.0)" };

  navLinkConfig[textColor || "white"] = true;

  const scrollLinkConfig = {
    smooth: true,
    duration: IsMobile() ? 1000 : 700,
  };

  return (
    <Nav
      w-100
      direction="r"
      justify="sb"
      sm-justify="c"
      pw="lg"
      ph="xs"
      style={{
        position: fixed && "fixed",
        backgroundColor: bgColors[bgColor],
        transition: scrolled && "0s",
        transform: scrolled && "translateY(-100%)",
        ...style,
      }}
      {...options}
      className={className}
    >
      <Container w-50 justify="fs" sm-w="w-1">
        <Container w-8 style={{ minWidth: "3rem" }} className="navLogo">
          <Logo color={logoColor || textColor || "white"} />
        </Container>
      </Container>

      <Container w-50 justify="fe" sm-w="w-80" sm-justify="c">
        {links.map((link, idx) =>
          link.route ? (
            <RouteLink
              key={idx}
              to={`${link.route}`}
              style={{ textDecoration: "none" }}
              onClick={ ()=>  scroll.scrollTo('top') || scrollTop }
            >
              <Text {...navLinkConfig}>{link.name.toUpperCase()}</Text>
            </RouteLink>
          ) : (
            <Link
              key={idx}
              to={link.scroll.toLowerCase()}
              {...scrollLinkConfig}
              offset={link.offset}
              onClick={() =>
                link.useLocomotive &&
                scroll.scrollTo(document.querySelector(`#${link.scroll}`), {duration: 500})
              }
            >
              <Text {...navLinkConfig}>{link.name.toUpperCase()}</Text>
            </Link>
          )
        )}
      </Container>

      {showCart && (
        <Container sm-w="w-1" pw="xs" hover-scale="md">
          <RouteLink to={"/cart"}>
            <Container onClick={scrollTop}>
              <BascketIcon
                size={1}
                color={textColor}
                hoverColor={textHoverColor || "yellow"}
                redirect
              />
            </Container>
          </RouteLink>
        </Container>
      )}
    </Nav>
  );
};

export default Navbar;
