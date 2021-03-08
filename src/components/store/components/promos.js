import React from "react";
import { Container, Text, Img } from "../../../framework/assets";
import duki from "../../../Assets/IMG/styled-store/Artists/SVG/duki-transparent.svg";
import oky from "../../../Assets/IMG/styled-store/Artists/SVG/oky-full.svg";
import lauh from "../../../Assets/IMG/styled-store/Artists/SVG/lauh-full.svg";
import styled from "styled-components";

const Promo = styled(Container)`
  overflow: hidden;
  max-height: 90vh;
  min-height: 90vh;
  @media (max-width: 768px) {
    max-height: 100%;
    padding: 0 1rem;
  }
  .oky-container {
    max-height: 100%;
    img {
      padding-top: 25rem;
    }
    @media (max-width: 768px) {
      max-height: 30rem;
    }
  }
  .duki-container {
    max-height: 100%;
    img {
      padding-top: 30rem;
    }
    @media (max-width: 768px) {
      max-height: 30rem;
    }
  }
`;

const StorePromos = ({ promo = 1 }) => {
  switch (promo) {
    case 1:
      return (
        <Promo
          w-100
          whitesmoke
          b-shadow="5"
          pw="lg"
          direction="r"
          sm-direction="c"
          className="promo-container"
          style={{ zIndex: "5" }}
        >
          <Container w-50 sm-w="w-100" mh="md" direction="c">
            <Text
              w-70
              fourth
              weight="thin"
              mh="sm"
              md
              style={{
                textAlign: "center",
                lineHeight: "50px",
              }}
            >
              Los{" "}
              <Text main md red>
                Artistas
              </Text>{" "}
              que trabajaron con nosotros.
            </Text>

            <Text black md main>
              #FMF
            </Text>
          </Container>

          <Container
            w-50
            sm-w="w-100"
            className="duki-container"
            style={{
              overflow: "hidden",
              mixBlendMode: "multiply",
              zIndex: "-1",
            }}
          >
            <Img src={duki} w-47 style={{ minWidth: "20rem" }} />
            <Text
              main
              md
              red
              style={{ position: "absolute", left: "20%", bottom: "30%" }}
            >
              duki
            </Text>
          </Container>
        </Promo>
      );

    case 2:
      return (
        <Promo
          w-100
          whitesmoke
          b-shadow="5"
          pw="lg"
          sm-direction="c"
          className="promo-container"
          style={{ zIndex: "5" }}
        >
          <Container w-50 sm-w="w-100" mh="md" direction="c">
            <Text
              w-70
              fourth
              weight="thin"
              mh="sm"
              md
              sm-size="sm"
              style={{
                textAlign: "center",
                lineHeight: "50px",
              }}
            >
              Tenemos distintos diseños, y constantemente estamos creando
              nuevos.
            </Text>

            <Text darkest-yellow sm main d-shadow="8">
              #FMFSneakers
            </Text>
          </Container>

          <Container
            w-50
            sm-w="w-100"
            className="oky-container"
            style={{
              overflow: "hidden",
              mixBlendMode: "multiply",
              zIndex: "-1",
            }}
          >
            <Img src={oky} w-30 style={{ minWidth: "15rem" }} />
            <Text
              main
              md
              red
              style={{ position: "absolute", right: "30%", bottom: "30%" }}
            >
              oky
            </Text>
          </Container>
        </Promo>
      );

    case 3:
      return (
        <Promo
          direction="rr"
          w-100
          whitesmoke
          b-shadow="5"
          pw="lg"
          vh-80
          style={{ zIndex: "5" }}
        >
          <Container w-50 direction="c">
            <Text
              w-70
              fourth
              weight="thin"
              mh="sm"
              md
              style={{
                textAlign: "center",
                lineHeight: "50px",
              }}
            >
              Tenemos distintos diseños, y constantemente estamos creando
              nuevos.
            </Text>

            <Text darkest-yellow sm main d-shadow="8">
              #FMFSneakers
            </Text>
          </Container>

          <Container
            w-50
            style={{
              maxHeight: "100%",
              overflow: "hidden",
              mixBlendMode: "darken",
              zIndex: "-1",
            }}
          >
            <Img src={lauh} w-60 style={{ paddingTop: "8rem" }} />
            <Text
              main
              md
              red
              style={{ position: "absolute", right: "30%", bottom: "30%" }}
            >
              DJ lauh
            </Text>
          </Container>
        </Promo>
      );

    default:
      break;
  }
};

export default StorePromos;
