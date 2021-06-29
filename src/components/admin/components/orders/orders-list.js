import React, { useState, useEffect } from "react";
import { Container, Text, Configs } from "../../../../framework/assets";
import OrderDetails from "./order-details";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { BringOrders, UpdateOrder, GetOrderStates } from "../../db/orders";
import { ObtainDate } from "../../../../helpers/functions";
import PageSelector from "../../../store/components/full-store/page-selector";
import InputSearch from "../search-input";

const PanelContainer = styled(Container)`
  .limited-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Notification = ({ text, bgColor }) => {
  return (
    <Container
      red
      {...{ [bgColor]: true }}
      style={{
        zIndex: "1",
        padding: ".2rem",
        borderRadius: "3px",
      }}
    >
      <Text weight="bold" white style={{ fontSize: "9px" }}>
        {text}
      </Text>
    </Container>
  );
};

const Info = () => {
  return (
    <Container
      bg="dark-gray"
      b-radius="circular"
      hover-scale="sm"
      style={{
        padding: ".6rem",
        cursor: "pointer",
      }}
    >
      <Container w-100>
        <Text white weight="black" style={{ position: "absolute" }}>
          !
        </Text>
      </Container>
    </Container>
  );
};

const OrdersList = () => {
  const [dbOrders, setDbOrders] = useState([]);
  const [searchResult, setSearchResult] = useState(dbOrders);
  const [actualPage, setActualPage] = useState([]);

  const fetchData = async (params) => {
    const orders = await BringOrders(params);
    setDbOrders(await orders);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchResult(dbOrders.reverse());
  }, [dbOrders]);

  const { Colors } = Configs;

  const MySwal = withReactContent(Swal);

  const detectState = (state) => {
    const list = GetOrderStates();
    return list.find((el) => el.key === state) || "sin datos";
  };

  const ChangeViewed = async (order) => {
    try {
      await UpdateOrder(order);
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const LaunchDetails = async (order) => {
    let viewedOrder = await order;
    viewedOrder.viewed = true;

    ChangeViewed(viewedOrder);

    MySwal.fire({
      width: "75%",
      html: (
        <OrderDetails
          order={order}
          onCancel={() => MySwal.close()}
          onSave={async () => await fetchData()}
          onDelete={async () => await fetchData()}
        />
      ),
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <PanelContainer w-100 direction="c" align="fs">
      <Text main md dark-yellow>
        Todos los Pedidos
      </Text>
      <Container ph="xs" w-100>
        <InputSearch
          originalValue={dbOrders}
          setSearchResult={setSearchResult}
          valuesToSearch={["payer", "payment_method"]}
        />
        <Text style={{ position: "absolute", left: "0", bottom: "15%" }}>
          Total: {searchResult.length}
        </Text>
      </Container>

      <Container
        w-100
        whitesmoke
        style={{
          padding: ".7rem 0rem .7rem 0rem",
          border: `1px solid ${Colors["lightest-gray"]}`,
        }}
      >
        <Container
          w-20
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Fecha:</Text>
        </Container>
        <Container
          w-20
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Comprador:</Text>
        </Container>
        <Container
          w-20
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Estado del Pedido:</Text>
        </Container>
        <Container
          w-20
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Valor:</Text>
        </Container>
        <Container
          w-20
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Forma de Pago:</Text>
        </Container>
        <Container w-20>
          <Text dark-gray>Opciones:</Text>
        </Container>
      </Container>

      <Container
        w-100
        direction="c"
        style={{
          display: "block",
          overflowY: "auto",
          maxHeight: "60vh",
          minHeight: "60vh",
        }}
      >
        {actualPage.map((order, idx) => (
          <Container
            key={idx}
            w-100
            ph="sm"
            {...{ whitesmoke: idx % 2 === 1 ? true : false }}
          >
            <Container
              direction="c"
              style={{
                position: "absolute",
                left: "0",
                minWidth: "4rem",
                maxWidth: "4rem",
              }}
            >
              {!order.viewed && <Notification text="SIN VER" bgColor="red" />}
              {ObtainDate() === order.date && (
                <Notification text="HOY" bgColor="blue" />
              )}
            </Container>

            <Container w-20>
              <Text weight="regular">{`${order.date}`}</Text>
            </Container>
            <Container w-20>
              <Text weight="regular">
                {`${order.payer.name.toUpperCase()} ${order.payer.surname.toUpperCase()}`}
              </Text>
            </Container>

            <Container w-20>
              <Text style={{ color: detectState(order.order_state).color }}>
                {detectState(order.order_state).value || "sin datos"}
              </Text>

              <Container
                onClick={() =>
                  MySwal.fire({
                    icon: "info",
                    title: "Hubo un cambio en el estado del Pedido",
                    text: "Accede para ver la actualización",
                    confirmButtonText: "Entrar",
                    showCancelButton: true,
                    cancelButtonText: "Cerrar",
                  }).then((result) => {
                    result.isConfirmed && LaunchDetails(order);
                  })
                }
                style={{
                  position: "absolute",
                  right: "0",
                  display: order.state_changed ? "flex" : "none",
                }}
              >
                <Info />
              </Container>
            </Container>
            <Container w-20>
              <Text>
                ${" "}
                {order.totals.subtotal_products +
                  order.totals.other_charge +
                  (order.totals.shipment_cost || 0) ||
                  0 ||
                  0}
              </Text>
            </Container>
            <Container w-20>
              <Text>{order.payment_method}</Text>
            </Container>
            <Container w-20>
              <Text
                weight="bold"
                style={{ cursor: "pointer" }}
                hover-scale="sm"
                hover-color="dark-gray"
                onClick={() => LaunchDetails(order)}
              >
                VER
              </Text>
            </Container>
          </Container>
        ))}
      </Container>

      <Container w-100 ph="xs">
        <PageSelector list={searchResult} setActualPage={setActualPage} />
      </Container>
    </PanelContainer>
  );
};

export default OrdersList;
