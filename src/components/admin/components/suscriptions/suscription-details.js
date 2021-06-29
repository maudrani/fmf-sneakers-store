import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Text,
  Img,
  Input,
} from "../../../../framework/assets";
import styled from "styled-components";
import editIcon from "../../../../Assets/IMG/Various/icons/edit.svg";
import checkIcon from "../../../../Assets/IMG/Various/icons/check2.png";
import { UpdateSuscription, DeleteSuscription } from "../../db/suscriptions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SuscriptionContainer = styled(Container)`
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

const SuscriptionDetails = ({ suscription, onCancel, onSave, onDelete }) => {
  const [modifiedSuscription, setModifiedSuscription] = useState({});

  const MySwal = withReactContent(Swal);

  const general = {
    Email: { value: `${suscription.email}` },
    "Fecha de Suscripcion": { value: `${suscription.date_created}` },
  };

  const ActualizarPedido = async () => {
    const parsedSuscription = await {
      ...suscription,

      email: modifiedSuscription.general_Email || suscription.email,
      date_created:
        modifiedSuscription.['general_Fecha de Suscripcion'] || suscription.date_created,
    };

    MySwal.fire({
      title: "Actualizar Suscripción?",
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
          await UpdateSuscription(parsedSuscription);
          await onSave();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const SetModifiedData = (input, value) => {
    setModifiedSuscription({ ...modifiedSuscription, [input]: value });
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
          await DeleteSuscription(suscription);
          await onDelete();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <SuscriptionContainer w-100 direction="c">
      <Container w-100 direction="c">
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
            {Object.keys(general).map((data_name, idx) => {
              return (
                <EditInput
                  key={idx}
                  title={data_name}
                  data={general[data_name]}
                  onChange={(e) =>
                    SetModifiedData("general_" + data_name, e.target.value)
                  }
                />
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
    </SuscriptionContainer>
  );
};

export default SuscriptionDetails;
