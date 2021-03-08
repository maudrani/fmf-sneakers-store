import React, { useState, useEffect } from "react";
import { Container, Text, Img } from "../../../framework/assets";
import { BringProducts } from "../db/products";
import {
  ProductRoute,
  randomizeArray,
  MaxWidth,
  IsMobile,
} from "../../../helpers/functions";
import Card from "../../basics/product-card-styled";
import Loader from "../../basics/loader";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import categories from "../db/categories";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Board from "../../modules/products-board";
import oky from "../../../Assets/IMG/styled-store/Artists/renders/oky-art.png";

const SummaryContainer = styled(Container)`
  .product-slider {
    width: 100%;
    max-width: 100%;
  }

  #product-board {
    min-height: 100vh;
  }
`;

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow:
    (MaxWidth(600) && 1) || (MaxWidth(1000) && 2) || (MaxWidth(4000) && 3),
  slidesToScroll: 1,
};

const CategoryResume = ({ category = { ...categories[0] }, color }) => {
  const [cardProducts, setCardProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        query: { category: category.name },
        filter: {
          images: { x15: 1, x25: 1 },
          name: 1,
          category: 1,
        },
      };

      const fetchedData = await BringProducts(params);

      setCardProducts(randomizeArray(await fetchedData, fetchedData.length));
    };
    fetchData();
  }, [category]);

  let colorSetted = { assets: { [color]: true }, bg: { [color]: true } };

  if (color === "black") {
    colorSetted.assets = {};
    colorSetted.assets["dark-gray"] = true;
  }

  return cardProducts ? (
    <SummaryContainer w-100 direction="c" id="category-summary">
      <Container
        b-shadow="6"
        black
        w-100
        style={{
          backgroundSize: "cover",
        }}
      >
        <Container w-100 direction="c" id="categoria">
          <Container style={{ padding: "1.5rem 0", marginLeft: "-2rem" }}>
            <Text
              {...colorSetted.assets}
              main
              lg
              w-1
              style={{ marginRight: "2rem" }}
            >
              #
            </Text>
            <Text xl sm-size="md" main white style={{ textAlign: "center" }}>
              {category.name}
            </Text>
          </Container>
          <Text
            white
            w-70
            weight="light"
            ph="md"
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              wordSpacing: "3px",
              textAlign: "center",
              paddingTop: "0",
            }}
          >
            {category.description}
          </Text>
          <Container style={{ paddingBottom: "3rem" }}>
            <Text
              bg={Object.keys(colorSetted.assets)[0]}
              main
              black
              sm
              style={{ padding: ".2rem 1rem" }}
            >
              #FMFSneakers
            </Text>
          </Container>
        </Container>
        <Container
          {...colorSetted.bg}
          w-100
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            opacity: "0.02",
            zIndex: "-1",
          }}
        />
      </Container>
      {!showAll ? (
        <Container w-100 b-shadow="inset-3" id="product-board">
          {category.name !== "Crear" ? (
            <Container w-80 style={{ paddingBottom: "5rem" }}>
              <Slider {...sliderSettings} className="product-slider">
                {cardProducts.slice(0, 5).map((prod, idx) => {
                  return (
                    <Container key={idx} w-100 ph="lg" pw="sm">
                      <Link
                        to={() => "/" + ProductRoute(prod)}
                        style={{ textDecoration: "none" }}
                      >
                        <Card product={prod} />
                      </Link>
                    </Container>
                  );
                })}
              </Slider>
            </Container>
          ) : (
            <Container direction="cr">
              <Container w-100 h-100 b-shadow="inset-4">
                <Img d-shadow="7" w-50 src={category.img2} style={{minWidth:'30rem'}} />
              </Container>

              <Container vh-80 w-100 sm-h='vh-60' sm-direction="cr">
                {!IsMobile() && (
                  <Container
                    w-60
                    sm-w="w-100"
                    whitesmoke
                    bg-image="wall"
                    /* b-shadow="inset-5" */
                    style={{ maxHeight: "100%", overflow: "hidden" }}
                  >
                    <Img
                      mh="md"
                      mw="md"
                      w-10
                      src={oky}
                      style={{
                        mixBlendMode: "multiply",
                        marginBottom: "8rem",
                      }}
                    />
                    <Img
                      mw="lg"
                      w-30
                      src={oky}
                      style={{
                        mixBlendMode: "multiply",
                        marginBottom: "20rem",
                      }}
                    />
                  </Container>
                )}
                <Container w-40 sm-w="w-100" whitesmoke h-100>
                  <Text
                    w-75
                    lg
                    sm-size="md"
                    ph="lg"
                    weight="black"
                    fourth
                    style={{ textAlign: "center" }}
                  >
                    EL DISEÑO QUE{" "}
                    <Text main red sm-size="lg" xl>
                      MÁS
                    </Text>{" "}
                    TE GUSTE
                  </Text>
                </Container>
              </Container>
            </Container>
          )}
        </Container>
      ) : (
        <Container
          w-100
          b-shadow="inset-3"
          ph="lg"
          id="product-board"
          style={{ paddingBottom: "9rem" }}
        >
          <Container w-80>
            <Board products={cardProducts} styled gap="4rem" />
          </Container>
        </Container>
      )}
      {category.name !== "Crear" && (
        <ScrollLink
          to="product-board"
          smooth={true}
          duration={100}
          style={{
            textDecoration: "none",
            position: "absolute",
            bottom: "3rem",
            cursor: "pointer",
          }}
        >
          <Container
            black
            b-shadow="8"
            hover-shadow="2"
            hover-bg="dark-red"
            bg-image="wall1"
            style={{ padding: "1rem 6rem" }}
            onClick={() => setShowAll(!showAll)}
          >
            <Text sm white weight="thin">
              {!showAll ? "Mostrar todo" : "Mostrar menos"}
            </Text>
          </Container>
        </ScrollLink>
      )}
    </SummaryContainer>
  ) : (
    <Loader />
  );
};

export default CategoryResume;
