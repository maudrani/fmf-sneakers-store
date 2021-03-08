import React from "react";
import { Container, Text, Img } from "../../../framework/assets";
import { colors } from "../../../framework/global";
import styled from "styled-components";

const ResumeContainer = styled(Container)`
  .products-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 1rem;
  }

  .info-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 1rem;
  }

  @media (max-width: 768px) {
    .product-info {
      font-size: 13px;
      * {
        font-size: 13px;
      }
    }
  }
`;

const OrderResume = ({ order }) => {
  return (
    <ResumeContainer w-100 direction="c">
      <Container
        justify="fs"
        w-100
        lightest-gray
        ph="xs"
        pw="xs"
        style={{
          borderBottom: `1px solid ${colors["light-gray"]}`,
        }}
      >
        <Container
          darkest-yellow
          b-radius="circular"
          style={{ maxWidth: "2.5rem", maxHeight: "2.5rem" }}
        >
          <Text whitesmoke weight="black" pw="md" ph="md">
            4
          </Text>
        </Container>
        <Container pw="xs">
          <Text sm>Resumen de Compra</Text>
        </Container>
      </Container>
      <Container w-100 pw="sm" ph="sm" direction="c">
        <Container w-100 direction="c">
          <Container w-100 whitesmoke justify="fs" style={{ padding: "7px 0" }}>
            <Text style={{ fontSize: "18px" }}>Items: </Text>
          </Container>

          <Container mh="xs" className="products-container" w-100>
            {order.items.map((product, idx) => {
              return (
                <Container
                  key={idx}
                  b-radius="xs"
                  style={{
                    border: `1px solid ${colors["light-gray"]}`,
                    overflow: "hidden",
                  }}
                >
                  <Img
                    w-30
                    src={product.images.x15[0]}
                    style={{ marginRight: ".5rem", minWidth: "5rem" }}
                  />

                  <Container w-100 direction="c" align="fs">
                    <Text dark-red className="product-info">
                      <Text dark-gray>nombre: </Text>
                      {product.name.toUpperCase()}
                    </Text>
                    <Text className="product-info">
                      <Text dark-gray>cantidad: </Text>
                      {product.quantity}
                    </Text>
                    <Text className="product-info">
                      <Text dark-gray>calidad: </Text>
                      {product.quality.name}
                    </Text>
                    <Text className="product-info">
                      <Text dark-gray>talle: </Text>
                      {product.size}
                    </Text>
                    <Text className="product-info">
                      <Text dark-gray>total: </Text>${product.total}
                    </Text>
                  </Container>
                </Container>
              );
            })}
          </Container>
        </Container>

        <Container
          direction="c"
          jutify="sa"
          mh="sm"
          ph="sm"
          w-100
          style={{ borderTop: `1px solid ${colors["lightest-gray"]}` }}
        >
          <Container w-100 direction="c" mh="xs">
            <Container
              w-100
              whitesmoke
              justify="fs"
              style={{ padding: "7px 0" }}
            >
              <Text style={{ fontSize: "18px" }}>
                Información de personal:{" "}
              </Text>
            </Container>
            <Container className="info-container" w-100 justify="fs" ph="sm">
              <Container direction="c" align="fs">
                <Text light-gray>Nombre:</Text>
                <Text>{order.payer.name + " " + order.payer.surname}</Text>
              </Container>

              <Container direction="c" align="fs">
                <Text light-gray>Teléfono:</Text>
                <Text>{order.payer.phone.number}</Text>
              </Container>

              <Container direction="c" align="fs">
                <Text light-gray>Email:</Text>
                <Text>{order.payer.email}</Text>
              </Container>
            </Container>
          </Container>

          <Container w-100 direction="c" mh="xs">
            <Container
              w-100
              whitesmoke
              justify="fs"
              style={{ padding: "7px 0" }}
            >
              <Text style={{ fontSize: "18px" }}>Información de Envío: </Text>
            </Container>
            <Container className="info-container" w-100 justify="fs" ph="sm">
              <Container direction="c" align="fs">
                <Text light-gray>Dirección:</Text>
                <Text>
                  {order.payer.address.street_name +
                    " " +
                    order.payer.address.street_number}
                </Text>
              </Container>

              <Container direction="c" align="fs">
                <Text light-gray>Código Postal:</Text>
                <Text>{order.payer.address.zip_code}</Text>
              </Container>
              <Container direction="c" align="fs">
                <Text light-gray>Provincia:</Text>
                <Text>{order.payer.address.province}</Text>
              </Container>
            </Container>
          </Container>

          <Container w-100 direction="c" mh="xs">
            <Container
              w-100
              whitesmoke
              justify="fs"
              style={{ padding: "7px 0" }}
            >
              <Text style={{ fontSize: "18px" }}>Forma de Pago: </Text>
            </Container>
            <Container className="info-container" w-100 justify="fs" ph="sm">
              <Container direction="c" align="fs">
                <Text light-gray>Método:</Text>
                <Text>
                  {order.payment_method === "mercadopago" && "Mercado Pago"}
                  {order.payment_method === "transferencia_bancaria" &&
                    "Transferencia Bancaria"}
                </Text>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </ResumeContainer>
  );
};

export default OrderResume;
