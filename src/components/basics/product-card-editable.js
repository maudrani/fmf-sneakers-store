import React, { useContext } from "react";
import { Container, Text, Img } from "../../framework/assets";
import { CartContext } from "../context/cart-context";
import { ProductRoute } from "../../helpers/functions";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { colors } from "../../framework/global";


const CardContainer = styled(Container)`
  .deleteIcon {
    display: flex;
  }

  .editBtn {
    display: flex;
  }

  .editContainer {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    .deleteIcon {
      display: none;
    }

    .editBtn {
      display: none;
    }

    .editContainer {
      display: flex;
    }
  }
`;

const CartCard = ({ product, onClick }) => {
  const [cart, setCart] = useContext(CartContext);
  const history = useHistory();
  const MySwal = withReactContent(Swal);




  const DeleteItem = () => {
    MySwal.fire({
      title: (
        <Text sm black>
          Eliminar{" "}
          <Text main dark-red style={{ fontSize: "1.9rem" }}>
            {product.name}
          </Text>{" "}
          del carrito?
        </Text>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: (
        <Text white pw="sm">
          Si
        </Text>
      ),
      cancelButtonText: (
        <Text white pw="sm">
          No
        </Text>
      ),
      confirmButtonColor: colors["dark-red"],
      cancelButtonColor: colors["dark-gray"],
    }).then((result) => {
      result.value && setCart(cart.filter((item) => item.id !== product.id));
    });
  };



  

  return (
    <CardContainer w-100 justify="sb" sm-direction="c" ph="sm" onClick={onClick}>
      <Container w-40 sm-w="w-100" justify="fs" sm-direction="c">
        <Container
          w-50
          sm-w="w-100"
          style={{
            maxHeight: "8rem",
            overflow: "hidden",
            minWidth: "7rem",
            cursor: "pointer",
          }}
          onClick={() => history.push(ProductRoute(product))}
        >
          <Img alt='sneaker image' src={product.images.x15[0]} style={{ minWidth: "10rem" }} />
        </Container>

        <Container direction="c" pw="xs" align="fs" sm-align="c" sm-w="w-100">
          <Text
            main
            md
            dark-red
            hover-color="red"
            style={{ marginBottom: "1rem", cursor: "pointer" }}
            onClick={() => history.push(ProductRoute(product))}
          >
            {product.name}
          </Text>
          <Text>{product.quality.name}</Text>
          <Text>Talle: {product.size}</Text>
        </Container>
      </Container>

      <Container w-40 sm-w="w-80" justify="sb" style={{ height: "8rem" }}>
        <Container direction="c">
          <Text dark-gray style={{ marginBottom: ".3rem", fontSize: "13px" }}>
            Precio
          </Text>
          <Text weight="light" sm>
            $ {product.price}
          </Text>
        </Container>

        <Container direction="c">
          <Text dark-gray style={{ marginBottom: ".3rem", fontSize: "13px" }}>
            Cantidad
          </Text>
          <Text weight="light" sm>
            {product.quantity}
          </Text>
        </Container>

        <Container direction="c">
          <Text dark-gray style={{ marginBottom: ".3rem", fontSize: "13px" }}>
            Total
          </Text>
          <Text weight="light" sm>
            $ {product.total}
          </Text>
        </Container>
      </Container>

      <Container
        className="deleteIcon"
        lightest-gray
        b-radius="circular"
        style={{ minHeight: "2.5rem", minWidth: "2.5rem", cursor: "pointer" }}
        hover-bg="light-gray"
        onClick={DeleteItem}
      >
        <Text weight="bold" sm>
          &times;
        </Text>
      </Container>

      <Container
        className="editContainer"
        w-60
        xs-w="w-80"
        justify="sa"
        /* xs-justify="sb" */
      >
        {/* <Container
          black
          d-shadow="8"
          hover-bg="dark-gray"
          style={{padding: "5px 0", minWidth: "5rem", cursor: "pointer" }}
          onClick={EditItem}
        >
          <Text whitesmoke>Editar</Text>
        </Container> */}
        <Container
          black
          d-shadow="8"
          hover-bg="dark-gray"
          style={{ padding: "5px 0", minWidth: "5rem", cursor: "pointer" }}
          onClick={DeleteItem}
        >
          <Text whitesmoke>Eliminar</Text>
        </Container>
      </Container>

      {/* <Container
        className="editBtn"
        black
        hover-bg="dark-gray"
        style={{
          padding: "8px 20px",
          cursor: "pointer",
          position: "absolute",
          right: "0",
          bottom: "0",
        }}
        onClick={EditItem}
      >
        <Text whitesmoke>Editar</Text>
      </Container> */}
    </CardContainer>
  );
};

export default CartCard;
