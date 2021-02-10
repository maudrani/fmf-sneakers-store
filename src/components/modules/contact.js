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
      ph="lg"
      black
      style={{ minHeight: "90vh" }}
      id="contacto"
    >
      <Container mw="md" direction="c" md-w="w-100">
        <Text main xl yellow ph="xs" sm-size="lg">
          Contactanos
        </Text>
        <Container ph="xs" direction="c">
          <Text white sm weight="thin" style={{ ...TextStyle }}>
            ¿Tenés algún diseño en mente?
          </Text>
          <Text white sm weight="thin" style={{ ...TextStyle }}>
            ¿Alguna pregunta?
          </Text>
        </Container>
        <Container ph="xs" direction="c">
          <Text yellow sm style={{ ...TextStyle }}>
            ¡Escribenos!
          </Text>
          <Text white xs weight="light" style={{ ...TextStyle }}>
            Te responderemos cuanto antes.
          </Text>
        </Container>
      </Container>
      <Container
        mw="md"
        direction="c"
        w-50
        md-w="w-100"
        ph="sm"
        h-50
        justify="sb"
      >
        <Container justify="sb" w-100>
          <Input
            placeholder="Nombre"
            ph="xs"
            white
            w-40
            border-color="white"
            spellCheck="false"
          />
          <Input
            placeholder="Mail"
            ph="xs"
            white
            w-40
            border-color="white"
            spellCheck="false"
          />
        </Container>
        <Input
          placeholder="Consulta"
          mh="md"
          ph="xs"
          mw="xs"
          w-100
          white
          border-color="white"
        />
        <Button
          xs
          black
          ph="xs"
          mh='sm'
          pw="md"
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
