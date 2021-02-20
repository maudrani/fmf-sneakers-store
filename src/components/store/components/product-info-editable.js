import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/cart-context";
import {
  Container,
  Text,
  Button,
  Img,
  Select,
} from "../../../framework/assets";
import styled from "styled-components";
import { values } from "../../store/db/orderValues";
import BasketIcon from "../components/e-icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { Link } from "react-scroll";
import { colors } from "../../../framework/global";

import { v4 as uuidv4 } from "uuid";
import { scrollTop, IsMobile } from "../../../helpers/functions";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductContainer = styled(Container)`
  .slider {
    width: 100%;
    height: 100%;

    filter: ${!IsMobile() && "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.42))"};
  }
`;

const ProductInfo = styled(Container)`
  min-height: 100vh;
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ProductModal = ({ data }) => {
  const [size, setSize] = useState(values.sizes.default);
  const [quantity, setQuantity] = useState(values.quantity.default);
  const [quality, setQuality] = useState(values.qualities.default);
  const [unitPrice, setUnitPrice] = useState(0);

  const [cart, setCart] = useContext(CartContext);

  const MySwal = withReactContent(Swal);
  const history = useHistory();

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleQuality = (e) => {
    setQuality(
      values.qualities.list.filter((el) => el.name === e.target.value)[0]
    );
  };

  const IncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const DecreaseQuantity = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  //Changes the unitary price
  useEffect(() => {
    setUnitPrice(quality.price ? quality.price : data.price);
  }, [data, quality.price]);

  const addItemToBascket = () => {
    const cartItem = {
      ...data,
      size: size,
      quality: quality,
      price: unitPrice,
      total: quantity * unitPrice,
      //For Mercado Pago
      title: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      currency_id: "ARS",
      picture_url: data.images.x25[0],
      category_id: "fashion",
      unit_price: unitPrice,
      quantity: quantity,
      description: `Custom sneaker - ${quality}`,
      id: uuidv4(),
    };

    setCart([...cart, { ...cartItem }]);

    MySwal.fire({
      title: (
        <Text sm black>
          Se agregó{" "}
          <Text main dark-red style={{ fontSize: "1.9rem" }}>
            {data.name}
          </Text>{" "}
          al carrito
        </Text>
      ),
      icon: "success",
      showCancelButton: true,
      confirmButtonText: <Text white>Ir al carrito</Text>,
      cancelButtonText: <Text white>Quedarme</Text>,
      confirmButtonColor: colors.black,
      cancelButtonColor: colors["dark-gray"],
    }).then((result) => {
      result.value && history.push("/cart");
      scrollTop();
    });
  };

  const thumbNails = () => {
    return data.images.x15.map((el, idx) => (
      <Img key={idx} src={el} style={{ filter: "none" }} />
    ));
  };

  return (
    <ProductContainer
      w-100
      h-100
      sm-direction="c"
      style={{ position: "relative" }}
    >
      <Container
        w-60
        sm-w="w-100"
        ph="md"
        bg-image="wall-graffiti"
        style={{
          overflow: "hidden",
          minHeight: !IsMobile() ? "100vh" : "75vh",
        }}
        dark-gray
        b-shadow="inset-4"
      >
        <Container w-60 sm-w="vw-100">
          <Carousel
            className="slider"
            renderThumbs={() => !IsMobile() && thumbNails()}
          >
            {data.images[!IsMobile() ? "x50" : "x25"].map((el, idx) => {
              return (
                <Img
                  key={idx}
                  alt="sneaker image"
                  src={el}
                  w-100
                  style={{ minWidth: "20rem", filter: "none" }}
                  b-shadow="8"
                />
              );
            })}
          </Carousel>
        </Container>
      </Container>

      <ProductInfo
        white
        w-40
        sm-w="w-100"
        pw="md"
        direction="c"
        align="fs"
        sm-align="c"
        style={{ paddingRight: "0" }}
      >
        <Text xs weight="light">
          {data.category}
        </Text>
        <Text main lg red ph="xs">
          {data.name}
        </Text>

        <Text weight="regular" sm>
          $ {quantity * unitPrice}
        </Text>

        <Container direction="c" ph="md" align="fs" sm-align="c" w-80>
          <Container w-100 justify="fs" sm-justify="c">
            <Container w-100 lg-w="w-75" direction="c" align="fs" sm-align="c">
              <Text weight="light" dark-gray>
                Talle
              </Text>

              <Select
                defaultValue={size}
                name="size"
                w-50
                border-color="dark-gray"
                style={{ padding: ".75rem 0", minWidth: "6rem" }}
                hover-bg="lightest-gray"
                onChange={handleSize}
                sm
                weight="light"
              >
                {values.sizes.list.map((size, idx) => {
                  return (
                    <option key={idx} value={size}>
                      {size}
                    </option>
                  );
                })}
              </Select>
            </Container>

            <Container w-100 md-w="w-75" direction="c" align="fs" sm-align="c">
              <Text weight="light" dark-gray>
                Cantidad
              </Text>

              <Container lightest-gray>
                <Container
                  hover-bg="light-gray"
                  style={{
                    minHeight: "3.4rem",
                    minWidth: "3.4rem",
                    cursor: "pointer",
                  }}
                  onClick={DecreaseQuantity}
                >
                  <Text sm weight="bold">
                    &#45;
                  </Text>
                </Container>
                <Text weight="light" sm>
                  {quantity}
                </Text>
                <Container
                  hover-bg="light-gray"
                  style={{
                    minHeight: "3.4rem",
                    minWidth: "3.4rem",
                    cursor: "pointer",
                  }}
                  onClick={IncreaseQuantity}
                >
                  <Text sm weight="bold">
                    &#43;
                  </Text>
                </Container>
              </Container>
            </Container>
          </Container>

          <Container
            ph="xs"
            w-80
            sm-w="w-75"
            direction="c"
            align="fs"
            sm-align="c"
            style={{ marginTop: "1rem" }}
          >
            <Text weight="light" dark-gray>
              Calidad
            </Text>

            <Select
              defaultValue={quality.name}
              name="size"
              w-100
              ph="xs"
              border-color="dark-gray"
              style={{ padding: ".75rem 0" }}
              hover-bg="lightest-gray"
              onChange={handleQuality}
            >
              {values.qualities.list.map((quality, idx) => {
                return (
                  <option key={idx} value={quality.name}>
                    {quality.name}
                  </option>
                );
              })}
            </Select>
          </Container>
        </Container>

        <Container w-100 direction="c" align="s" sm-align="c">
          <Container w-40 md-w="w-60">
            <Button
              w-100
              mh="xs"
              ph="xs"
              pw="xs"
              bg="black"
              white
              hover-bg="dark-yellow"
              hover-color="black"
              d-shadow="8"
              style={{ display: "flex", justifyContent: "space-around" }}
              onClick={addItemToBascket}
            >
              Añadir al carrito
              <BasketIcon size={1} />
            </Button>
          </Container>
          <Container w-40 md-w="w-60">
            <Button
              w-100
              ph="xs"
              pw="xs"
              hover-scale="sm"
              onClick={() => history.goBack()}
            >
              <Text>{"<"}</Text>
              <Text mw="xs">Volver</Text>
            </Button>
          </Container>
        </Container>

        <Container ph="sm" w-100 justify="fs" sm-justify="c" weight="light">
          <Text>
            Leer las{" "}
            <Link to="politics" smooth={true} duration={700} offset={-47}>
              <Text dark-red hover-color="red" style={{ cursor: "pointer" }}>
                Politicas de compra y fabricación.
              </Text>
            </Link>
          </Text>
        </Container>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductModal;
