import React, {useEffect} from "react";
import { Container, Img, Text } from "../../framework/assets";
import logo from "../../Assets/IMG/Brand/logo-full.svg";
import Navbar from "../modules/navbar";
import { useHistory } from "react-router-dom";
import { scrollTop } from "../../helpers/functions";

const PageNotFound = ({setShowContact}) => {
  const history = useHistory();
  const navLinks = [
    { name: "inicio", route: "/" },
    { name: "store", route: "/store" },
    { name: "categorías", route: "/categories" },
    { name: "contacto", scroll: "contacto" },
  ];

  useEffect(() => {
    setShowContact(true);
  }, [setShowContact]);

  return (
    <Container
      className='page'
      vh-100
      black
      bg-image="graffiti"
      direction="c"
      b-shadow="inset-3"
      onLoad={scrollTop}
    >
      <Navbar links={navLinks} />
      <Text main xl sm-size="md" white style={{ textAlign: "center" }}>
        No encontramos lo que buscabas...
      </Text>
      <Container
        yellow
        b-shadow="3"
        mh="lg"
        hover-bg="dark-yellow"
        hover-scale="sm"
        style={{ padding: ".6rem 2rem", cursor: "pointer" }}
        onClick={() => history.pish('/')}
      >
        <Text md main>
          INICIO
        </Text>
      </Container>
      <Img
        w-10
        src={logo}
        style={{ position: "absolute", bottom: "5%", minWidth: "5rem" }}
      />
    </Container>
  );
};

export default PageNotFound;
