import React from "react";
import { Container, Text, Button, Input } from "../../framework/assets";
import Footer from "./footer";

const Contact = () => {
  return (
    <Container vh-100 direction="c" black>
      <Container h-100 justify="sa" w-100 pw="lg">
        <Container direction="c">
          <Text main xl yellow ph="xs">
            Contactanos
          </Text>
          <Container ph="xs" direction="c">
            <Text whitesmoke sm weight="thin">
              ¿Tenés algún diseño en mente?
            </Text>
            <Text whitesmoke sm weight="thin">
              ¿Alguna consulta para hacernos?
            </Text>
          </Container>
          <Container ph="xs" direction="c">
            <Text yellow sm>
              ¡Envíanos una consulta!
            </Text>
            <Text whitesmoke xs weight="light">
              Te responderemos cuanto antes.
            </Text>
          </Container>
        </Container>
        <Container direction="c" w-50 h-40 justify="sb">
          <Container justify="sb" w-100>
            <Input placeholder="Nombre" ph="xs" whitesmoke w-40 />
            <Input placeholder="Mail" ph="xs" whitesmoke w-40 />
          </Container>
          <Input
            placeholder="Escribenos!"
            mh="md"
            ph="xs"
            mw="xs"
            w-100
            whitesmoke
          />
          <Button
            xs
            black
            ph="xs"
            pw="md"
            b-radius="semi"
            hover-scale="sm"
            bg="yellow"
            weight="bold"
            d-shadow="7"
            hover-shadow="1"
          >
            ENVIAR
          </Button>
        </Container>
      </Container>
      <Footer />
    </Container>
  );
};

export default Contact;
