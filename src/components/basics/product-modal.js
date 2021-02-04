import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cart-context";
import { Container, Text, Button, Img, Select } from "../../framework/assets";
import styled from "styled-components";
import { values } from "../store/db/orderValues";
import ReactStars from "react-rating-stars-component";

const Background = styled(Container)`
  z-index: 110;
  position: fixed;
  background-color: rgba(190, 190, 190, 0.9);
  min-height: 100vh;
  overflow-y: auto;

  @media (max-width: 410px) {
    padding: 20% 0rem;
  }
`;

const ModalContainer = styled(Container)`
  overflow-y: initial;
  overflow-x: hidden;

  @media (max-width: 768px) {
    display: block;
    height: 80vh;
    text-align: center;
  }
`;

const ImageContainer = styled(Container)`
  @media (max-width: 768px) {
    img {
      max-height: 30rem;
    }
  }
`;

const ModalInfo = styled(Container)`
  select {
    text-align-last: center;
    text-align: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
  }

  @media (max-width: 1135px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductModal = ({ launched, setLaunched, data }) => {
  const [size, setSize] = useState(values.sizes.default);
  const [quantity, setQuantity] = useState(values.quantity.default);
  const [quality, setQuality] = useState(values.qualities.default);
  const [unitPrice, setUnitPrice] = useState(0);

  const [cart, setCart] = useContext(CartContext);

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleQuality = (e) => {
    setQuality(
      values.qualities.list.filter((el) => el.name === e.target.value)[0]
    );
  };

  //Changes the unitary price
  useEffect(() => {
    setUnitPrice(quality.price ? quality.price : data.price);
  }, [data, quality.price]);

  const addItemToBascket = () => {
    const cartItem = {
      name: data.name,
      img: data.img,
      description: data.category,
      size: size,
      quantity: quantity,
      quality: quality,
      unitPrice: unitPrice,
      total: quantity * unitPrice,
    };

    let existe = false;

    setCart([...cart, { ...cartItem }]);

    if (cart.length !== 0) {
      manageQuantities(cartItem);
    }

    restoreValuesAndClose();
  };

  const manageQuantities = (item) => {
    let newItem = {};

    cart.forEach((product) => {
      if (
        product.name === item.name &&
        product.size === item.size &&
        product.quality === item.quality &&
        product.unitPrice === item.unitPrice
      ) {
        newItem = { ...item, quantity: parseInt(product.quantity) + parseInt(item.quantity) };
        setCart([...cart.filter((item) => item.name !== product.name), newItem]);
      }
    });

    console.log();
  };

  const restoreValuesAndClose = () => {
    setSize(values.sizes.default);
    setQuantity(values.quantity.default);
    setQuality(values.qualities.default);
    setLaunched({ launched: false, product: {} });
  };

  return (
    <Background
      w-100
      h-100
      ph="md"
      align="fs"
      style={{
        display: launched ? "flex" : "none",
        opacity: launched ? "1" : "0",
        top: "0",
      }}
    >
      <ModalContainer
        whitesmoke
        w-75
        md-w="w-90"
        sm-direction="c"
        b-radius="xs"
        optimize-scroll="none"
        vh-90
        b-shadow="2"
      >
        <Container
          hover-scale="md"
          whitesmoke
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            borderRadius: "50vh",
            zIndex: "90",
            height: "2rem",
            width: "2rem",
            paddingBottom: "0.3rem",
            cursor: "pointer",
            opacity: "0.7",
          }}
          onClick={restoreValuesAndClose}
        >
          <Text sm weight="light">
            &times;
          </Text>
        </Container>

        <ImageContainer
          bg-image="wall"
          w-55
          sm-w="w-100"
          style={{ maxHeight: "40rem", overflow: "hidden" }}
        >
          <Img src={data.img} />
        </ImageContainer>

        <ModalInfo
          whitesmoke
          w-45
          /* ph="xs" */
          pw="md"
          direction="c"
          align="fs"
          sm-align="c"
          lg-w="w-45"
        >
          <Text w-100 main lg red md-size="lg">
            {data.name}
          </Text>
          <Text w-100 xs weight="light">
            {data.category}
          </Text>
          <Container w-100 ph="xs" justify="fs" sm-justify="c">
            {data.rating && (
              <ReactStars
                count={5}
                size={36}
                value={data.rating}
                activeColor="#eedf0e"
                edit={false}
              />
            )}
          </Container>
          <Text ph="xs" w-100 weight="light" md>
            $ {quantity * unitPrice}
          </Text>

          <Container direction="c" ph="sm" jutify="fs" w-80>
            <Container w-100 justify="fs" sm-justify="c">
              <Container w-50 direction="c" align="fs" sm-align="c">
                <Text weight="light">Talle</Text>
                {launched && (
                  <Select
                    defaultValue={size}
                    name="size"
                    w-75
                    ph="xs"
                    onChange={handleSize}
                  >
                    {values.sizes.list.map((size, idx) => {
                      return (
                        <option key={idx} value={size}>
                          {size}
                        </option>
                      );
                    })}
                  </Select>
                )}
              </Container>

              <Container w-50 direction="c" align="fs" sm-align="c">
                <Text weight="light">Cantidad</Text>
                {launched && (
                  <Select
                    defaultValue={quantity}
                    name="quantity"
                    w-75
                    ph="xs"
                    onChange={handleQuantity}
                  >
                    {values.quantity.list.map((value, idx) => {
                      return (
                        <option key={idx} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </Select>
                )}
              </Container>
            </Container>

            <Container ph="xs" w-100 direction="c" align="fs" sm-align="c">
              <Text weight="light">Calidad</Text>

              {launched && (
                <Select
                  defaultValue={quality.name}
                  name="size"
                  w-75
                  ph="xs"
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
              )}
            </Container>
          </Container>

          <Container w-100 direction="c" align="s" sm-align="c">
            <Container w-80 sm-w="w-60">
              <Button
                w-100
                mh="xs"
                ph="xs"
                pw="xs"
                bg="black"
                whitesmoke
                hover-scale="xs"
                hover-color="yellow"
                onClick={addItemToBascket}
              >
                Añadir al carrito
              </Button>
            </Container>
            <Container w-80>
              <Button
                w-100
                ph="xs"
                pw="xs"
                weight="bold"
                hover-scale="sm"
                onClick={restoreValuesAndClose}
              >
                Cancelar
              </Button>
            </Container>
          </Container>
        </ModalInfo>
      </ModalContainer>
    </Background>
  );
};

export default ProductModal;
