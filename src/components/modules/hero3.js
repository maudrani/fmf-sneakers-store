import React, { useEffect, useState } from "react";
import { Container, Text, Img } from "../../framework/assets";
import { sizes } from "../../framework/global";
import { LogoFull } from "../basics/svg-images";
import styled from "styled-components";
import gelatoVideo from "../../Assets/Video/gelato-X4.mp4";
import gelatoLowQ from "../../Assets/Video/gelato-X1.mp4";
import { Link as RouteLink } from "react-router-dom";
import { IsMobile } from "../../helpers/functions";
import Social from "../basics/socialMedia";
import gsap, { Back } from "gsap";

import dukiSneaker1 from "../../Assets/IMG/Products/Promo/Caricaturescas/Renders/duki1.png";
import dukiSneaker2 from "../../Assets/IMG/Products/Promo/Caricaturescas/Renders/duki2.png";
import blackoff1 from "../../Assets/IMG/Products/Promo/Black off/Renders/blackoff1.png";
import blackoff2 from "../../Assets/IMG/Products/Promo/Black off/Renders/blackoff2.png";

const HeroContainer = styled(Container)`
  /* min-height: 140vh; */

  .video_container {
    filter: saturate(0%) contrast(120%);
    margin-top: 0rem;

    @media (max-width: 768px) {
      margin: 0px;

      .goteo_video {
        min-height: 120vh !important;
      }
    }

    @media (min-width: 1920px) {
      .goteo_video {
        min-height: 150vh !important;
      }
    }
  }

  .social-media-container {
    bottom: 0;
    top: 0;
    right: 70px;
    width: ${sizes.md};
  }

  .bottom-wrapper {
    /* clip-path: polygon(0 0, 100% 10%, 100% 100%, 0% 100%); */
  }

  @media (max-width: 1000px) {
    .bottom-text {
      margin-top: 25px;

      * {
        font-size: 10px;
      }
    }

    .button-link {
      margin: 5px;
      * {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 768px) {
    max-height: 100vh;
    min-height: 100vh;

    .logo-buttons-container {
      padding-top: 2rem;
    }

    .social-media-container {
      flex-direction: row-reverse;
      bottom: 0;
      top: 70%;
      width: 100%;
      right: 0;

      .social-media {
        width: 2rem;
        margin: 0 1rem;
      }
    }
  }
`;

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => !IsMobile() && setOffsetY(window.pageYOffset);

  useEffect(() => {
    const LogoFullAnimation = () => {
      const tl = gsap.timeline({
        defaults: { duration: 4, ease: Back.Power4, opacity: 1 },
      });
      const tl2 = gsap.timeline({
        defaults: { duration: 4, ease: Back.easeOut.config(2), opacity: 0 },
      });

      const tl4 = gsap.timeline({
        defaults: { duration: 1.5, ease: Back.easeOut.config(2), opacity: 0 },
      });

      const tl5 = gsap.timeline({
        defaults: { duration: 0.75, ease: Back.easeOut.config(2), opacity: 0 },
      });

      const tl6 = gsap.timeline({
        defaults: { duration: 1.5, ease: Back.easeOut.config(2), opacity: 0 },
      });

      tl.from(
        ".video_container",
        { delay: 1, opacity: 0 },
        IsMobile() ? "=0.2" : "=1.5"
      );

      tl2.to(
        ".video_container",
        { delay: 1, opacity: 1, filter: "saturate(90%) contrast(1)" },
        IsMobile() ? "=0.3" : "=1.6"
      );

      tl4.from(
        ".button-category",
        { delay: 1, opacity: 0, marginRight: "5rem", transformOrigin: "left" },
        IsMobile() ? "=0" : "=1.2"
      );

      tl5
        .from(
          ".button-store",
          {
            delay: 1,
            opacity: 0,
            marginLeft: "5rem",
            transformOrigin: "right",
          },
          IsMobile() ? "=0" : "=1.2"
        )
        .from(
          ".bottom-text",
          {
            delay: 1,
            opacity: 0,
            marginTop: "5rem",
            transformOrigin: "top",
          },
          "=0"
        );

      tl6
        .from(
          ".viñeta",
          {
            delay: 1,
            opacity: 0,
            transformOrigin: "center",
          },
          IsMobile() ? "=0.2" : "=0.0"
        )
        .from(
          ".shoe",
          {
            delay: 1,
            opacity: 0,
            bottom: "50px",
          },
          "=0"
        );
    };

    LogoFullAnimation();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let today = new Date().getFullYear();

  return (
    <HeroContainer w-100 justify="fs" direction="c" black>
      <Container
        h-100
        w-100
        justify="sb"
        pw="lg"
        ph="xl"
        style={{ mixBlendMode: !IsMobile() && "hard-light", zIndex: "10" }}
        /* bg-image="wall1" */
        className="logo-buttons-container"
        data-scroll
        data-scroll-speed={!IsMobile() && "3"}
      >
        <Container direction="c" h-100 w-100>
          <Container
            w-25
            md-w="w-50"
            d-shadow={!IsMobile() && "5"}
            classNane="logo-container"
          >
            <LogoFull />
          </Container>

          <Container w-30 md-w="w-70" sm-direction="c">
            <Container
              w-50
              sm-w="w-100"
              black
              mw="xs"
              hover-scale="sm"
              hover-bg="darkest-yellow"
              b-shadow="8"
              className="button-link button-category"
            >
              <RouteLink
                to="/categories"
                style={{
                  textDecoration: "none",
                  padding: ".5rem 0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Text main white md>
                  categorías
                </Text>
              </RouteLink>
            </Container>
            <Container
              w-50
              sm-w="w-100"
              black
              mw="xs"
              hover-scale="sm"
              hover-bg="darkest-yellow"
              b-shadow="8"
              className="button-link button-store"
            >
              <RouteLink
                to="/store"
                style={{
                  textDecoration: "none",
                  padding: ".5rem 0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Text main white md>
                  store
                </Text>
              </RouteLink>
            </Container>
          </Container>
          <Container mh="lg" className="bottom-text" direction="c">
            <Text pw="xs" lightest-gray>
              SNEAKERS PERSONALIZADOS
            </Text>
            <Text ph="xs" pw="xs" lightest-gray>
              Argentina
            </Text>
          </Container>
        </Container>
      </Container>

      {/* Video */}
      <Container
        w-100
        h-100
        style={{
          overflow: "hidden",
          position: "absolute",
          zIndex: "1",
          minWidth: "100%",
          minHeight: "100vh",
          transition: "0s",
        }}
        className="video_container"
      >
        <video autoPlay loop muted className="goteo_video">
          <source
            src={IsMobile() ? gelatoLowQ : gelatoVideo}
            typeof="video/mp4"
          />
        </video>
      </Container>

      {/* Shoes */}
      {false && (
        <>
          <Container
            w-100
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              zIndex: "2",
              display: IsMobile() ? "none" : "flex",
            }}
          >
            <Img
              d-shadow="2"
              src={dukiSneaker1}
              w-10
              className="shoe"
              style={{
                position: "absolute",
                left: IsMobile() ? "-25px" : "90px",
                bottom: "10px",
                transform: `translateY(-${offsetY * 0.35}px)`,
                zIndex: "2",
                transition: "0.6s",
                minWidth: "9rem",
                display: IsMobile() ? "none" : "flex",
              }}
            />

            <Img
              d-shadow={!IsMobile() && "2"}
              src={dukiSneaker2}
              w-10
              className="shoe"
              style={{
                position: "absolute",
                right: IsMobile() ? "20px" : "90px",
                bottom: "15px",
                transform: `translateY(-${offsetY * 0.35}px)`,
                zIndex: "2",
                transition: "0.6s",
                minWidth: "9rem",
              }}
            />

            <Img
              d-shadow={!IsMobile() && "2"}
              src={blackoff1}
              w-10
              className="shoe"
              style={{
                position: "absolute",
                left: IsMobile() ? "40px" : "350px",
                bottom: "15px",
                transform: `translateY(-${offsetY * 0.35}px) rotate(25deg)`,
                zIndex: "2",
                transition: "0.6s",
                minWidth: "9rem",
              }}
            />

            <Img
              d-shadow="2"
              src={blackoff2}
              w-10
              className="shoe"
              style={{
                position: "absolute",
                right: IsMobile() ? "-25px" : "350px",
                bottom: "10px",
                transform: `translateY(-${offsetY * 0.35}px) rotate(25deg)`,
                zIndex: "2",
                transition: "0.6s",
                minWidth: "9rem",
                display: IsMobile() ? "none" : "flex",
              }}
            />

            <Container
              ph="xxxl"
              bg-image="wall"
              yellow
              w-100
              style={{
                zIndex: "1",
                position: "absolute",
                bottom: "-300px",
                left: "0",
                transform: `translateY(-${offsetY * 0.1}px)`,
                opacity: 0.9,
                transition: "0.6s",
              }}
              className="bottom-wrapper bottom-text"
            />
          </Container>
        </>
      )}

      {/* Left Disclaimer */}
      {!IsMobile() && (
        <Container
          style={{
            position: "absolute",
            left: "-40px",
            bottom: !IsMobile() ? "15vh" : "0",
            top: "0",
            zIndex: "3",
            mixBlendMode: !IsMobile() && "hard-light",
          }}
          direction="c"
          className="button-category"
          data-scroll
          data-scroll-speed={!IsMobile() && "-3"}
        >
          <Text whitesmoke style={{ transform: "rotate(-90deg)" }}>
            FMF SNEAKERS ARGENTINA {today}
          </Text>
        </Container>
      )}

      {/* Social */}
      <Container
        style={{
          position: "absolute",
          zIndex: "10",
          bottom: !IsMobile() ? "15vh" : "0",
        }}
        direction="c"
        className="button-store social-media-container"
        data-scroll
        data-scroll-speed={!IsMobile() && "-3"}
      >
        <Container mh="sm" className="social-media">
          <Social />
        </Container>
        <Container mh="sm" className="social-media">
          <Social socialMedia="instagram" />
        </Container>
      </Container>

      {/* Viñeta */}
      <Container
        className="viñeta"
        w-100
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          zIndex: "2",
          background:
            "radial-gradient(circle, rgba(44,47,123,0) 27%, rgba(9,11,15,1) 100%)",
        }}
      />
    </HeroContainer>
  );
};

export default Hero;
