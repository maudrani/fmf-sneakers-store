import React, {useEffect, useState} from "react";
import { Container, Text, Img } from "../../framework/assets";
import Navbar from "../modules/navbar";
import gelatoVideo from "../../Assets/Video/gelato-X3.mp4";
import dukiArt from "../../Assets/IMG/styled-store/Artists/SVG/duki-transparent.svg";
import duki from "../../Assets/IMG/styled-store/Artists/Duki.jpeg";
import styled from "styled-components";
import {BringProducts} from '../store/db/products'

const ArtistsContainer = styled(Container)`
  /* min-height: 100vh; */

  .duki-container {
    position: absolute;
    height: 100%;
    left: 0;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.7);
    clip-path: polygon(0 0, 100% 0, 71% 100%, 0% 100%);
  }
`;

const Artists = () => {

  const navbarLinks = [
    { name: "store", route: "/store" },
    { name: "inicio", route: "/" },
    { name: "categorías", route: "/categories" },
    { name: "contacto", scroll: "contacto" },
  ];

  useEffect(() => {
      
  }, [])

  return (
    <Container w-100 data-scroll-section>
      <Navbar bgColor="black" links={navbarLinks} />
      <ArtistsContainer w-100 direction="c">
        <Container w-100 black style={{ minHeight: "70vh" }}>
          <Text main red xl>
            Artistas{" "}
            <Text weight="light" lg white>
              que trabajaron con nosotros.
            </Text>
          </Text>
        </Container>

        <Container w-100 justify="sb">
          <Container w-50>
            <Img src={duki} />
          </Container>
          <Container w-50 direction='c'>
            <Text main red xl>
              Duki
            </Text>

          </Container>
        </Container>

        <Container w-100>
          <Container className="duki-container" w-50>
            <Img w-25 src={dukiArt} d-shadow="5" />
          </Container>
          <Container style={{ maxHeight: "80vh", overflow: "hidden" }}>
            <video autoPlay loop muted>
              <source src={gelatoVideo} typeof="video/mp4" />
            </video>
          </Container>
        </Container>

        <Container w-100 vh-100 black></Container>
      </ArtistsContainer>
    </Container>
  );
};

export default Artists;
