import React from "react";
import { Container, Text, Button, Input } from "../../framework/assets";

const TextStyle = { textAlign: "center" };

const Contact = () => {
  return (
    <Container
      h-100
      justify="c"
      md-direction="c"
      w-100
      pw="lg"
      black
      style={{ minHeight: "100vh" }}
    >
      <Container mw="md" direction="c" md-w="w-100" ph="md">
        <Text main xl yellow ph="xs" sm-size="lg">
          Contactanos
        </Text>
        <Container ph="xs" direction="c">
          <Text whitesmoke sm weight="thin" style={{ ...TextStyle }}>
            ¿Tenés algún diseño en mente?
          </Text>
          <Text whitesmoke sm weight="thin" style={{ ...TextStyle }}>
            ¿Alguna consulta para hacernos?
          </Text>
        </Container>
        <Container ph="xs" direction="c">
          <Text yellow sm style={{ ...TextStyle }}>
            ¡Envíanos una consulta!
          </Text>
          <Text whitesmoke xs weight="light" style={{ ...TextStyle }}>
            Te responderemos cuanto antes.
          </Text>
        </Container>
      </Container>
      <Container mw="md" direction="c" w-40 md-w="w-100" h-45 justify="sb">
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
  );
};

export default Contact;
