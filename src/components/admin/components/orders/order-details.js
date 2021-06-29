import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Text,
  Img,
  Input,
  Select,
} from "../../../../framework/assets";
import styled from "styled-components";
import editIcon from "../../../../Assets/IMG/Various/icons/edit.svg";
import checkIcon from "../../../../Assets/IMG/Various/icons/check2.png";
import { UpdateOrder, DeleteOrder, GetOrderStates } from "../../db/orders";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const OrderContainer = styled(Container)`
  .data-input {
    * {
      transition: 0.5s;
    }
    padding: 0.5rem 1rem;
    text-align: end;
    width: 65%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const EditInput = ({ title, data, onChange, name, color = "" }) => {
  const [enableInput, setEnableInput] = useState(false);
  const data_input = useRef();
  const input_params = {
    "dark-gray": !enableInput && color === "" && !enableInput,
    black: enableInput,
    weight: enableInput ? "regular" : "light",
    sm: enableInput,
    [color]: true,
  };

  useEffect(() => {
    enableInput && data_input.current.focus();
  }, [enableInput]);

  const resetInput = () => {
    data_input.current.value = data.value;
    setEnableInput(false);
  };

  const isEditable = data.editable === undefined ? true : data.editable;

  return (
    <Container w-100 whitesmoke justify="sb" style={{ marginTop: ".3rem" }}>
      <Text>{title}:</Text>
      <Input
        name={name}
        onChange={onChange}
        {...input_params}
        ref={data_input}
        disabled={!enableInput}
        className="data-input"
        defaultValue={`${data.prefix || ""} ${data.value}`}
      />
      <Container
        h-100
        w-10
        w-15
        style={{ position: "absolute", right: "-20%" }}
        justify="sb"
      >
        <Container w-35>
          <Img
            hover-scale="sm"
            src={!enableInput ? editIcon : checkIcon}
            style={{
              cursor: "pointer",
              display: isEditable ? "flex" : "none",
            }}
            onClick={() => setEnableInput(!enableInput)}
          />
        </Container>
        <Text
          dark-gray
          hover-scale="sm"
          style={{ cursor: "pointer" }}
          onClick={() => resetInput()}
        >
          {isEditable && "Reset"}
        </Text>
      </Container>
    </Container>
  );
};

const PanelButton = ({ text, style, symbol, onClick, color }) => {
  const detectSymbol = () => {
    switch (symbol) {
      case "times":
        return (
          <Text md white weight="black">
            &times;
          </Text>
        );

      case "check":
        return (
          <Text md white weight="black">
            ✓
          </Text>
        );

      default:
        break;
    }
  };

  return (
    <Container
      {...{ [color]: true }}
      w-15
      b-radius="xs"
      justify="sa"
      b-shadow="5"
      hover-scale="sm"
      style={{
        padding: ".2rem",
        cursor: "pointer",
        maxHeight: "3rem",
        minHeight: "3rem",
        ...style,
      }}
      onClick={onClick}
    >
      <Text white>{text}</Text>
      {detectSymbol()}
    </Container>
  );
};

const OrderDetails = ({ order, onCancel, onSave, onDelete }) => {
  const [modifiedOrder, setModifiedOrder] = useState({});
  const StatesList = GetOrderStates();
  const [selectedState, setSelectedState] = useState(
    StatesList.find((state) => state.key === order.order_state)
  );

  const MySwal = withReactContent(Swal);

  const contacto = {
    Nombre: { value: `${order.payer.name}` },
    Apellido: { value: order.payer.surname },
    Dni: { value: order.payer.dni || "Sin definir" },
    Mail: { value: `${order.payer.email}` },
    Telefono: { value: order.payer.phone.number },
    Calle: {
      value: `${order.payer.address.street_name}`,
    },
    Número: {
      value: order.payer.address.street_number,
    },
    "Código Postal": { value: order.payer.address.zip_code },
    Provincia: { value: order.payer.address.province },
    Localidad: { value: order.payer.address.state },
    'Tipo de envío': { value: order.shipment_type},
  };

  const resumen = {
    ID: { value: order.order_id, editable: false },
    Fecha: { value: order.date },
    Hora: { value: order.hour },
    "Forma de pago": { value: order.payment_method, editable: false },
    Subtotal: {
      value: order.totals.subtotal_products,
      prefix: "$",
      editable: false,
    },
    "MercadoPago - recargo": {
      value: order.totals.other_charge || 0,
      prefix: "$",
      editable: false,
    },
    "Costo de envío": {
      value: order.totals.shipment_cost|| 0,
      prefix: "$",
      editable: false,
    },
    Total: {
      value: order.totals.subtotal_products + (order.totals.other_charge || 0) + (order.totals.shipment_cost || 0),
      prefix: "$",
      editable: false,
    },
  };

  const ActualizarPedido = async () => {
    const parsedOrder = await {
      ...order,
      payer: {
        name: modifiedOrder.contacto_Nombre || order.payer.name,
        surname: modifiedOrder.contacto_Apellido || order.payer.surname,
        dni: modifiedOrder.contacto_Dni || order.payer.dni,
        email: modifiedOrder.contacto_Mail || order.payer.email,
        phone: {
          number: modifiedOrder.contacto_Telefono || order.payer.phone.number,
        },
        address: {
          street_name:
            modifiedOrder.contacto_Calle || order.payer.address.street_name,
          street_number:
            modifiedOrder.contacto_Número || order.payer.address.street_number,
          zip_code:
            modifiedOrder["contacto_Código Postal"] ||
            order.payer.address.zip_code,
          province:
            modifiedOrder.contacto_Provincia || order.payer.address.province,
          state: modifiedOrder.contacto_Localidad || order.payer.address.state,
        },
      },

      date: modifiedOrder.resumen_Fecha || order.date,
      hour: modifiedOrder.resumen_Hora || order.hour,
      payment_method:
        modifiedOrder["resumen_Forma de pago"] || order.payment_method,
      other_charge:
        modifiedOrder["resumen_MercadoPago - recargo"] ||
        order.totals.other_charge,
        shipment_cost:
        modifiedOrder["resumen_Costo de envío"] || order.totals.shipment_cost,

      order_state: selectedState.key || order.order_state,
    };

    MySwal.fire({
      title: "Actualizar Pedido?",
      text: "Recuerda que puedes realizar esta acción cuantas veces quieras",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        MySwal.showLoading();
        try {
          await UpdateOrder(parsedOrder);
          await onSave();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const SetModifiedData = (input, value) => {
    setModifiedOrder({ ...modifiedOrder, [input]: value });
  };

  const BorrarOrden = async () => {
    MySwal.fire({
      title: "Borrar Pedido?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        MySwal.showLoading();
        try {
          await DeleteOrder(order);
          await onDelete();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <OrderContainer w-100 direction="c">
      <Container w-100>
        <Container w-60 direction="c" mh="sm">
          <Text sm bg="whitesmoke" w-100>
            General:
          </Text>
          <Container
            w-100
            direction="c"
            style={{
              margin: "10px 0px",
              padding: "20px",
              border: "1.5px solid lightgray",
              borderRadius: "5px",
            }}
          >
            <Container
              justify="sb"
              w-100
              whitesmoke
              style={{ marginTop: "0.3rem" }}
            >
              <Text>Estado del pedido:</Text>
              <Select
                w-50
                ph="xs"
                onChange={(e) =>
                  setSelectedState(
                    StatesList.find((state) => state.key === e.target.value)
                  )
                }
                defaultValue={order.order_state}
                style={{
                  color: selectedState ? selectedState.color : "black",
                }}
              >
                {StatesList.map((state, idx) => {
                  return (
                    <option
                      key={idx}
                      value={state.key}
                      style={{ color: state.color }}
                    >
                      {state.value.toUpperCase()}
                    </option>
                  );
                })}
              </Select>
            </Container>
          </Container>
        </Container>
      </Container>

      <Container w-100 direction="c">
        <Container w-60 direction="c" mh="sm">
          <Text sm bg="whitesmoke" w-100>
            Contacto:
          </Text>
          <Container
            w-100
            direction="c"
            style={{
              margin: "10px 0px",
              padding: "20px",
              border: "1.5px solid lightgray",
              borderRadius: "5px",
            }}
          >
            {Object.keys(contacto).map((data_name, idx) => {
              return (
                <EditInput
                  key={idx}
                  title={data_name}
                  data={contacto[data_name]}
                  onChange={(e) =>
                    SetModifiedData("contacto_" + data_name, e.target.value)
                  }
                />
              );
            })}
          </Container>
        </Container>

        <Container w-60 direction="c" mh="sm">
          <Text sm bg="whitesmoke" w-100>
            Resumen:
          </Text>
          <Container
            w-100
            direction="c"
            style={{
              margin: "10px 0px",
              padding: "20px",
              border: "1.5px solid lightgray",
              borderRadius: "5px",
            }}
          >
            {Object.keys(resumen).map((data_name, idx) => {
              return (
                <EditInput
                  key={idx}
                  title={data_name}
                  data={resumen[data_name]}
                  onChange={(e) =>
                    SetModifiedData("resumen_" + data_name, e.target.value)
                  }
                />
              );
            })}
          </Container>
        </Container>

        <Container w-60 direction="c" mh="sm">
          <Text sm bg="whitesmoke" w-100>
            Detalle:
          </Text>
          <Container
            w-100
            direction="c"
            style={{
              margin: "10px 0px",
              padding: "20px",
              border: "1.5px solid lightgray",
              borderRadius: "5px",
            }}
          >
            {order.items.map((product, idx) => {
              const product_data = {
                Nombre: { value: product.name.toUpperCase(), editable: false },
                Cantidad: { value: product.quantity, editable: false },
                Calidad: { value: product.quality, editable: false },
                Talle: { value: product.size, editable: false },
                "Precio unitario": {
                  value: product.unit_price,
                  prefix: "$",
                  editable: false,
                },
                Total: {
                  value: product.unit_price * product.quantity,
                  prefix: "$",
                  editable: false,
                },
              };

              return (
                <Container
                  key={idx}
                  w-100
                  direction="c"
                  style={{
                    padding: "1rem 0",
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  <Container
                    w-100
                    whitesmoke
                    style={{
                      marginTop: ".3rem",
                      maxHeight: "15rem",
                      overflow: "hidden",
                    }}
                  >
                    <a
                      href={product.img}
                      rel="noreferrer"
                      target="_blank"
                      style={{ width: "100%" }}
                    >
                      <Img src={product.img} w-100 />
                    </a>
                  </Container>

                  {Object.keys(product_data).map((data_name, idx) => {
                    return (
                      <EditInput
                        key={idx}
                        title={data_name}
                        data={product_data[data_name]}
                      />
                    );
                  })}
                </Container>
              );
            })}
          </Container>
        </Container>
      </Container>

      <Container w-100 ph="xs" justify="sa">
        <PanelButton
          text="Guardar"
          color="blue"
          onClick={() => ActualizarPedido()}
        />
        <PanelButton text="Cerrar" color="dark-gray" onClick={onCancel} />
        <PanelButton
          text="Borrar"
          style={{ backgroundColor: "rgb(237,41,57)" }}
          onClick={() => BorrarOrden()}
        />
      </Container>
    </OrderContainer>
  );
};

export default OrderDetails;
