import React, { useState } from "react";
import { Container, Text, Img } from "../../framework/assets";
import { colors } from "../../framework/global";
import logoFull from "../../Assets/IMG/Brand/logo-full.svg";
import styled from "styled-components";

const PoliticsContainer = styled(Container)`
  @media (max-width: 768px) {
    .linkTitle {
      font-size: 11px;
    }

    .imgContainer {
      padding-top: 0;
    }
  }
`;

const Politics = () => {
  const [textToShow, setTextToShow] = useState("description");

  const placeText = () => {
    switch (textToShow) {
      case "description":
        return (
          <Container justify="fs" align="fs" direction="c">
            <Text
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                wordSpacing: "3.8px",
              }}
            >
              <Text
                white
                bg="dark-gray"
                style={{
                  padding: "5px 7px",
                  fontSize: "18px",
                  lineHeight: "30px",
                  wordSpacing: "3.8px",
                }}
              >
                FABRICACIÓN:
              </Text>
              <br />
              Nuestros diseños son aplicados a mano individualmente en las
              zapatillas con pintura especial resistente, y también poseen un
              barnizado sobre la pintura para mayor protección a los detalles.
            </Text>
            <Text
              ph="sm"
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                wordSpacing: "3.8px",
              }}
            >
              <Text
                white
                bg="darkest-yellow"
                style={{
                  padding: "5px 7px",
                  fontSize: "18px",
                  lineHeight: "30px",
                  wordSpacing: "3.8px",
                }}
              >
                CUIDADOS/MANTENIMIENTO:
              </Text>{" "}
              Nuestros sneakers/zapatillas están para lucirse y disfrutarse, por
              eso, al momento de lavarlas, recomendamos realizar este proceso
              con agua, jabón blanco y esponja suave. Luego secar. Evitar
              cepillo cerda dura que pueda raspar o lastimar el barniz.
            </Text>
          </Container>
        );

      case "quality":
        return (
          <Container justify="fs" align="fs" direction="c">
            <Text
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                wordSpacing: "3.8px",
              }}
            >
              <Text
                white
                bg="dark-gray"
                style={{
                  padding: "5px 7px",
                  fontSize: "18px",
                  lineHeight: "30px",
                  wordSpacing: "3.8px",
                }}
              >
                CALIDAD:
              </Text>{" "}
              <br />
              Puedes elegir entre 2 tipos de calidad de zapatillas para aplicar
              tu diseño:
              <br /> <br /> -Calidad original (AAA) <br /> -Originales ( mayor
              costo $)
            </Text>
            <br />
            <Text
              ph="sm"
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                wordSpacing: "3.8px",
              }}
            >
              <Text
                black
                weight="bold"
                bg="dark-yellow"
                style={{
                  padding: "5px 7px",
                  fontSize: "18px",
                  lineHeight: "30px",
                  wordSpacing: "3.8px",
                }}
              >
                DISEÑOS:
              </Text>{" "}
              <br />
              En FMF tenemos distintos diseños publicados en nuestra página y
              constantemente estamos creando nuevos para que encuentres el que
              más se adapte a tu personalidad. Si tienes una idea para tu diseño
              personalizado nos la cuentas y nosotros nos encargamos de
              plasmarlo en nuestras zapatillas FMF Customs.
            </Text>
          </Container>
        );

      case "buy":
        return (
          <Container justify="fs" align="fs" direction="c">
            <Text
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                wordSpacing: "3.8px",
              }}
            >
              <Text
                white
                bg="black"
                style={{
                  padding: "5px 7px",
                  fontSize: "18px",
                  lineHeight: "30px",
                  wordSpacing: "3.8px",
                }}
              >
                FORMAS DE PAGO:
              </Text>
              <br /> • Puedes realizar el pago mediante transferencia bancaria
              (precio contado efectivo) <br /> • Tarjetas de crédito/débito
              recibimos mediante MercadoPago con un recargo del 10% sobre el
              precio total del producto.
            </Text>
            <Container ph="md" direction="c" align="fs">
              <Text dark-red>Importante:</Text>
              <Text
                style={{
                  fontSize: "14px",
                  lineHeight: "23.3px",
                  wordSpacing: "2.8px",
                }}
              >
                <Text
                  white
                  bg="dark-red"
                  style={{
                    padding: "5px 7px",
                    lineHeight: "30px",
                    wordSpacing: "3.8px",
                  }}
                >
                  POLÍTICA DE COMPRA:
                </Text>
                <br />
                Por favor tenga en cuenta que todos los pedidos se procesan en
                el orden en que se reciben. Poseemos una demora de 14 días
                hábiles desde que se realiza la compra para que su pedido esté
                fabricado. Luego se despachan vía encomienda en las próximas
                72hs con destino al cliente. FMF Sneakers Argentina realiza
                todos sus trabajos hechos a mano y únicamente se fabrican a
                pedido. No se otorgan reembolsos una vez realizada la compra. La
                compra de este artículo significa que ha leído y comprendido
                esta política, los cuidados de uso del producto, métodos de
                pago, métodos de envío y plazos de entrega.
              </Text>
            </Container>
          </Container>
        );

      case "shipping":
        return (
          <Container justify="fs">
            <Text
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                wordSpacing: "3.8px",
              }}
            >
              <Text
                black
                weight="bold"
                bg="dark-yellow"
                style={{
                  padding: "5px 7px",
                  fontSize: "18px",
                  lineHeight: "30px",
                  wordSpacing: "3.8px",
                }}
              >
                ENVÍO:
              </Text>
              <br />
              Realizamos envíos a todo el país vía encomienda, las empresas
              encargadas de llevar nuestros paquetes son Andreani, Vía Cargo,
              Md-Cargas o Correo Argentino dependiendo la ubicación del cliente.
              El producto se envía embalado en su caja con todos los datos del
              cliente en la parte superior.
            </Text>
          </Container>
        );

      default:
        break;
    }
  };

  return (
    <PoliticsContainer direction="c" w-100 justify="fs" id="politics">
      <Container
        w-75
        sm-w="w-90"
        justify="sb"
        style={{ borderBottom: `2px solid ${colors["lightest-gray"]}` }}
      >
        <Container
          ph="md"
          hover-bg="lightest-gray"
          style={{
            borderBottom:
              textToShow === "description"
                ? `2px solid ${colors["dark-red"]}`
                : `2px solid ${colors["lightest-gray"]}`,
            cursor: "pointer",
            marginBottom: "-2px",
          }}
          onClick={() => setTextToShow("description")}
        >
          <Text
            className="linkTitle"
            weight={textToShow === "description" ? "black" : "bold"}
            dark-gray
            style={{
              color: textToShow === "description" && colors["dark-red"],
            }}
          >
            Descripción
          </Text>
        </Container>

        <Container
          ph="md"
          hover-bg="lightest-gray"
          style={{
            borderBottom:
              textToShow === "quality"
                ? `2px solid ${colors["dark-red"]}`
                : `2px solid ${colors["lightest-gray"]}`,
            cursor: "pointer",
            marginBottom: "-2px",
          }}
          onClick={() => setTextToShow("quality")}
        >
          <Text
            className="linkTitle"
            weight={textToShow === "quality" ? "black" : "bold"}
            dark-gray
            style={{
              color: textToShow === "quality" && colors["dark-red"],
            }}
          >
            Calidad
          </Text>
        </Container>

        <Container
          ph="md"
          hover-bg="lightest-gray"
          style={{
            borderBottom:
              textToShow === "buy"
                ? `2px solid ${colors["dark-red"]}`
                : `2px solid ${colors["lightest-gray"]}`,
            cursor: "pointer",
            marginBottom: "-2px",
          }}
          onClick={() => setTextToShow("buy")}
        >
          <Text
            className="linkTitle"
            weight={textToShow === "buy" ? "black" : "bold"}
            dark-gray
            style={{ color: textToShow === "buy" && colors["dark-red"] }}
          >
            Política de Compra
          </Text>
        </Container>

        <Container
          ph="md"
          hover-bg="lightest-gray"
          style={{
            borderBottom:
              textToShow === "shipping"
                ? `2px solid ${colors["dark-red"]}`
                : `2px solid ${colors["lightest-gray"]}`,
            cursor: "pointer",
            marginBottom: "-2px",
          }}
          onClick={() => setTextToShow("shipping")}
        >
          <Text
            className="linkTitle"
            weight={textToShow === "shipping" ? "black" : "bold"}
            dark-gray
            style={{
              color: textToShow === "shipping" && colors["dark-red"],
            }}
          >
            Envío
          </Text>
        </Container>
      </Container>

      <Container w-75 sm-w="w-90" align="fs" sm-align="c" sm-direction="c">
        <Container w-50 sm-w="w-100" direction="c" ph="lg">
          {placeText()}
          <Container w-100 justify="fs">
            <Text
              ph="sm"
              style={{
                lineHeight: "30px",
                wordSpacing: "3.8px",
              }}
            >
              <Text
                white
                bg="black"
                style={{
                  padding: "5px 7px",
                  fontSize: "18px",
                  lineHeight: "30px",
                  wordSpacing: "3.8px",
                }}
              >
                CONTACTO:{" "}
              </Text>{" "}
              <br /> • E-Mail: fmfsneakers@gmail.com <br /> • Instagram:
              @fmfsneakers
              <br /> • Facebook: FMF Sneakers <br /> • Twitter: @fmfsneakers
            </Text>
          </Container>
        </Container>
        <Container
          className="imgContainer"
          w-50
          sm-w="w-100"
          ph="lg"
          justify="fe"
          sm-justify="c"
        >
          <Img alt="fmf logo full" w-65 d-shadow="8" src={logoFull} />
        </Container>
      </Container>
    </PoliticsContainer>
  );
};

export default Politics;
