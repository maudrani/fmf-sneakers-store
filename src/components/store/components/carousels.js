import React from "react";
import { Container, Text, Img } from "../../../framework/assets";
import styled from "styled-components";
import { Carousel as ImgCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useHistory } from "react-router-dom";
import { ProductRoute, MaxWidth } from "../../../helpers/functions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselOne = styled(Container)`
  .main-carousel {
    width: 100%;
  }
`;

const CarouselTwo = styled(Container)`
  .clipped {
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  }
  .clipped2 {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 33% 100%);
  }

  .clipped3 {
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
  }

  .wall-repeat {
    position: absolute;
    top: 0;
    bottom: 0;

    mix-blend-mode: overlay;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
    grid-gap: 0.4rem;
  }

  .carousel-slider {
    width: 100%;
    max-width: 100%;
    max-height: 70vh;
  }
`;

const Carousel = ({ carousel = 1, products = [] }) => {
  const history = useHistory();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
  };

  const ArrayRepeat = [];
  for (let i = 0; i <= 40; i++) {
    ArrayRepeat.push(1);
  }

  switch (carousel) {
    case 1:
      return (
        <CarouselOne w-100>
          <ImgCarousel
            className="main-carousel"
            autoPlay
            infiniteLoop
            showThumbs={false}
          >
            {products.slice(0, 4).map((el, idx) => {
              let mainCongif = {
                yellow: idx === 3 && true,
                black: idx === 1 && true,
                "dark-red": idx === 2 && true,
                white: idx === 0 && true,
                "bg-image": idx === 1 ? "wall1" : idx === 2 ? "wall1" : "wall",
                text: {
                  "lightest-gray": (idx === 1 && true) || (idx === 2 && true),
                },
              };
              return (
                <Container
                  style={{ zIndex: "10" }}
                  key={idx}
                  w-100
                  {...mainCongif}
                  justify="sa"
                  vh-80
                >
                  <Container w-35 direction="c" style={{ marginLeft: "8rem" }}>
                    <Container w-100 style={{ marginBottom: "8.5rem" }}>
                      <Text
                        {...mainCongif.text}
                        main
                        xl
                        style={{ position: "absolute", zIndex: "1" }}
                      >
                        {el.name}
                      </Text>
                      <Text
                        main
                        xl
                        red
                        style={{
                          position: "absolute",
                          transform: "translate(.2rem, .2rem)",
                          opacity: "0.4",
                        }}
                      >
                        {el.name}
                      </Text>
                      <Text
                        main
                        xl
                        whitesmoke
                        style={{
                          position: "absolute",
                          transform: "translate(-0.2rem, -0.2rem)",
                          opacity: "0.4",
                        }}
                      >
                        {el.name}
                      </Text>
                    </Container>
                    <Container
                      ph="xs"
                      pw="md"
                      darkest-yellow
                      b-shadow="8"
                      hover-scale="sm"
                      hover-bg="dark-yellow"
                      onClick={() => history.push("/" + ProductRoute(el))}
                      style={{
                        marginBottom: "-4rem",
                        zIndex: "20",
                        cursor: "pointer",
                      }}
                    >
                      <Text black>DESCUBRIR</Text>
                    </Container>
                  </Container>

                  <Container
                    w-100
                    className="wall-repeat"
                    style={{ opacity: "0.3", zIndex: "-1" }}
                  >
                    {ArrayRepeat.map((je, idx) => {
                      return (
                        <Text
                          key={idx}
                          id="wall_item"
                          dark-grey
                          main
                          md
                          style={{
                            fontSize:
                              (idx % 4 === 0 && "5rem") ||
                              (idx % 6 === 0 && "1rem") ||
                              (idx % 2 === 0 && ".5rem"),
                            color: idx % 7 === 0 && "white",
                          }}
                        >
                          {el.name}
                        </Text>
                      );
                    })}
                  </Container>

                  <Container w-65 className="clipped2">
                    <Img key={idx} alt="sneaker image" src={el.images.x50[0]} />
                  </Container>
                </Container>
              );
            })}
          </ImgCarousel>
        </CarouselOne>
      );

    case 2:
      return (
        <CarouselTwo w-100>
          <Slider {...sliderSettings} autoplay className="carousel-slider">
            {products.slice(0, 4).map((el, idx) => {
              return (
                <Container
                  key={idx}
                  w-100
                  justify="sa"
                  vh-70
                  b-shadow="inset-3"
                >
                  <Container
                    w-100
                    h-100
                    b-shadow="inset-4"
                    red
                    bg-image="wall3"
                    style={{
                      position: "absolute",
                      zIndex: "10",
                      backgroundColor: "rgba(255,255,255,0)",
                    }}
                  >
                    <Container direction="c">
                      <Container d-shadow="8" mh="lg">
                        <Text sm-size="lg" main xl style={{ zIndex: "1" }}>
                          {el.name}
                        </Text>
                        <Text
                          sm-size="lg"
                          main
                          xl
                          red
                          style={{
                            position: "absolute",
                            transform: "translate(.2rem, .2rem)",
                            opacity: "0.4",
                          }}
                        >
                          {el.name}
                        </Text>
                        <Text
                          sm-size="lg"
                          main
                          xl
                          whitesmoke
                          style={{
                            position: "absolute",
                            transform: "translate(-0.2rem, -0.2rem)",
                            opacity: "0.4",
                          }}
                        >
                          {el.name}
                        </Text>
                      </Container>
                      <Container
                        mh="sm"
                        ph="xs"
                        pw="md"
                        darkest-yellow
                        b-shadow="8"
                        hover-scale="sm"
                        hover-bg="dark-yellow"
                        onClick={() => history.push("/" + ProductRoute(el))}
                        style={{
                          zIndex: "20",
                          cursor: "pointer",
                        }}
                      >
                        <Text black>DESCUBRIR</Text>
                      </Container>
                    </Container>
                  </Container>

                  <Container
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      zIndex: "9",
                    }}
                    h-100
                    w-100
                  />

                  <Container w-100 style={{ zIndex: "-10" }}>
                    <Img
                      vw-100
                      key={idx}
                      alt="sneaker image"
                      style={{ zIndex: "-10" }}
                      src={
                        (MaxWidth(500) && el.images.x15[0]) ||
                        (MaxWidth(1000) && el.images.x25[0]) ||
                        (MaxWidth(4000) && el.images.x50[0])
                      }
                    />
                  </Container>
                </Container>
              );
            })}
          </Slider>
        </CarouselTwo>
      );

    default:
      break;
  }
};

export default Carousel;
