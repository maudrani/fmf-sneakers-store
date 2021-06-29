import React, { useState, useEffect } from "react";
import { Container, Img, Text } from "../../framework/assets";
import sneaker from "../../Assets/IMG/Products/demo/sneaker2.webp";
import { BringProducts } from "../store/db/products";
import ProductsBoard from "./products-board";
import { IsMobile } from "../../helpers/functions";
import { Link as RouteLink } from "react-router-dom";
import dukiSneaker1 from "../../Assets/IMG/Products/Promo/Caricaturescas/Renders/duki1.png";
import dukiSneaker2 from "../../Assets/IMG/Products/Promo/Caricaturescas/Renders/duki2.png";
import blackoff1 from "../../Assets/IMG/Products/Promo/Black off/Renders/blackoff1.png";
import blackoff2 from "../../Assets/IMG/Products/Promo/Black off/Renders/blackoff2.png";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import styled from "styled-components";

const DesignsContainer = styled(Container)`
  .glass {
    position: absolute;
    top: 7.4%;
    bottom: 2.72%;
    width: 91.6%;
    z-index: 1;
    backdrop-filter: blur(5px);
  }
`;

const Promo = ({ showMain = false }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        limit: !IsMobile() ? 9 : 4,
        filter: { name: 1, category: 1, "images.x25": 1, "images.x15": 1 },
        random: true,
      };

      setProducts(await BringProducts(params));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { scroll } = useLocomotiveScroll();

  return (
    <DesignsContainer
      w-100
      direction="c"
      id="diseños"
      dark-gray
      style={{ overflowX: "hidden" }}
    >
      {showMain && (
        <Container md-direction="c" w-100 whitesmoke>
          <Container
            w-50
            md-w="w-100"
            pw="lg"
            ph="md"
            style={{ textAlign: "center" }}
          >
            <Text lg main>
              <Text red lg main sm-size="sm">
                Descubrí
              </Text>{" "}
              nuestros diseños
            </Text>
          </Container>

          <Container
            w-50
            md-w="w-100"
            pw="lg"
            ph="sm"
            data-scroll
            data-scroll-speed="1"
          >
            <Img alt="sneaker promo image" src={sneaker} d-shadow="7" />
          </Container>
        </Container>
      )}

      <Container
        w-100
        justify="fs"
        direction="c"
        ph="lg"
        style={{ zIndex: 1 }}
        bg-image="wall-graffiti"
      >
        {!IsMobile() && (
          <Container
            justify="sa"
            w-100
            style={{
              zIndex: -1,
              position: "absolute",
              top: "0",
              bottom: "0",
              overflow: "hidden",
            }}
          >
            <Container
              w-100
              style={{
                background: 'radial-gradient(circle, rgba(44,47,123,0) 37%, rgba(9,11,15,1) 100%)',
                zIndex: "2",
                position: "absolute",
                top: "0",
                bottom: "0",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            />

            {/* CHECK */}
            <Img
              src={blackoff1}
              w-20
              data-scroll
              data-scroll-speed="4"
              d-shadow={!IsMobile() && "2"}
              style={{ position: "absolute", top: "10%", right: "-2.5%" }}
            />
            <Img
              src={blackoff2}
              w-12
              data-scroll
              data-scroll-speed="2"
              d-shadow={!IsMobile() && "2"}
              style={{ position: "absolute", top: "50%", left: "-.5%" }}
            />
            <Img
              src={dukiSneaker1}
              w-20
              data-scroll
              data-scroll-speed="3"
              d-shadow={!IsMobile() && "2"}
              style={{ position: "absolute",bottom: 0 ,right: '5%' }}
            />
            <Img
              src={dukiSneaker2}
              w-17
              data-scroll
              data-scroll-speed="4"
              d-shadow={!IsMobile() && "2"}
              style={{ position: "absolute", top: "0", left: "5%" }}
            />
          </Container>
        )}

        <Container
          whitesmoke
          pw="xl"
          style={{ transform: "translateY(2rem)", zIndex: 3 }}
          bg-image="wall2"
          b-shadow="8"
          ph="xs"
        >
          <Text lg main sm-size="md">
            <Text red lg main sm-size="md">
              Descubrí
            </Text>{" "}
            nuestros diseños
          </Text>
        </Container>

        <Container
          w-100
          h-100
          direction="c"
          pw={!IsMobile() && "lg"}
          ph=""
          style={{ zIndex: 2 }}
        >
          <Container
            w-100
            ph="xl"
            pw="xs"
            style={
              {
                /* backgroundColor: !IsMobile() && "rgba(230,230,230,0.2)",
              boxShadow:
                !IsMobile() && "inset 0px 0px 70px 70px rgba(255,255,255,0.15)",
              zIndex: 2, */
              }
            }
            className="products-container"
            b-radius="xs"
            direction="c"
          >
            {products.length > 0 && (
              <ProductsBoard
                products={products}
                styled
                animCards
                gap={!IsMobile() && "3rem"}
                maxSize="20rem"
                minSize="20rem"
                style={{ zIndex: 2 }}
              />
            )}

            <Container
              dark-red
              style={{ marginTop: "5rem", cursor: "pointer" }}
              hover-scale="sm"
              hover-bg="red"
              b-shadow="8"
              onClick={() => scroll.scrollTo("top")}
              bg-image="wall"
            >
              <RouteLink
                to="/store"
                style={{ textDecoration: "none", padding: "1rem 3rem" }}
              >
                <Text md main whitesmoke>
                  VER TODOS
                </Text>
              </RouteLink>
            </Container>
          </Container>
        </Container>
      </Container>
    </DesignsContainer>
  );
};

export default Promo;
