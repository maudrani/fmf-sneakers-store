import React from "react";
import { Container, Img, Text } from "../../framework/assets";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { IsMobile, CartProductRoute } from "../../helpers/functions";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const GalleryContainer = styled(Container)`
  position: relative;
  height: 100%;
  margin: auto;

  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: 0.5fr 0.2fr 0.2fr auto 0.3fr;
  grid-gap: 2vh;
  grid-auto-flow: dense;

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  .img {
    cursor: pointer;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    :first-child {
      grid-column-start: span 2;
      grid-row-start: span 3;
    }

    :nth-child(2n + 3) {
      grid-row-start: span 3;
    }

    :nth-child(4n + 5) {
      grid-column-start: span 2;
      grid-row-start: span 2;
    }

    :nth-child(6n + 7) {
      grid-row-start: span 1;
    }

    :nth-child(8n + 9) {
      grid-column-start: span 1;
      grid-row-start: span 1;
    }
  }

  .img .largeImg {
    height: 100%;
    width: 100%;
    object-fit: cover;
    filter: brightness(0.3) grayscale(100);
    transition: 0.3s ease-in-out;

    :hover {
      filter: brightness(1) grayscale(0);
    }
  }

  .img .mobileImg {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.3s ease-in-out;
    /* opacity: 0.15; */

    :hover {
      opacity: 1;
      filter: brightness(1) saturate(1.1) grayscale(0);
    }
  }
`;

const TextName = styled(Text)`
  position: absolute;
  bottom: 0;
  z-index: 10;
  cursor: default;
  mix-blend-mode: luminosity;
  pointer-events: none;

  @media (max-width: 450px) {
    font-size: 17px;
    padding: 7px 7px;
  }
`;

const Gallery = ({ photos = [], limit }) => {
  const history = useHistory();

  const { scroll } = useLocomotiveScroll();

  return (
    <GalleryContainer w-100 direction="c" align="fs">
      {photos.slice(0, limit).map((sneaker, idx) => {
        return (
          <Container
            key={idx}
            className="img"
            align="fs"
            justify="fs"
            b-shadow="8"
            onClick={() =>
              history.push("/" + CartProductRoute(sneaker)) ||
              scroll.scrollTo("top",{duration: 10})
            }
          >
            <TextName
              main
              md
              sm-size="sm"
              pw="xs"
              ph="xs"
              whitesmoke
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            >
              {sneaker.name}
            </TextName>
            {IsMobile() ? (
              <Img
                className="mobileImg"
                alt="sneaker image"
                src={sneaker.images.x25[0]}
              />
            ) : (
              <Img
                className="largeImg"
                alt="sneaker image"
                src={sneaker.images.x50[0]}
              />
            )}
          </Container>
        );
      })}
    </GalleryContainer>
  );
};

export default Gallery;
