import React from "react";
import { Container, Text, Button, Input } from "../../framework/assets";
import { useForm } from "react-hook-form";
import { colors } from "../../framework/global";
import { ObtainDate, ObtainTime } from "../../helpers/functions";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";

const ContactContainer = styled(Container)`
  .form-container {
    margin-top: 8rem;

    @media (max-width: 990px) {
      margin-top: 2rem;
    }
  }
`;

const TextStyle = { textAlign: "center" };

const Contact = () => {
  const pathname = window.location.pathname;
  const { register, errors, handleSubmit } = useForm({ mode: "onBlur" });
  const MySwal = withReactContent(Swal);

  const onSubmit = async (data) => {
    const notificationMail = {
      to: "fmfsneakersargentina@gmail.com",

      subject: `⚪ Consulta de ${data.name}.`,
      html: `<div style="max-width: 768px;">
          <div style="padding: 1rem 0;">
            <p style="font-size: 18px">
              <strong>Tienes una nueva consulta desde tu página.</strong
            </p>
            <span style="font-size: 11px; color: #606060;">
              <strong style="color: #A80000;">Importante:</strong> No responder a éste correo, el mail del contacto está detallado en los Datos.
            </span>
          </div>
          <div style="margin-top: 40px;">
            <h3>Datos:</h3>   
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
              <p>
                <strong>Nombre:</strong> ${data.name}
              </p>
              <p>
                <strong>Mail:</strong> ${data.email}
              </p>
              <p>
                <strong>Fecha:</strong> ${ObtainDate()}
              </p>
              <p>
                <strong>Hora:</strong> ${ObtainTime()}
              </p>
            </div>
          </div>
          <div style="margin: 40px 0px;">
            <h3>Mensaje:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
              <p style="padding: 0px 20px; white-space: pre-wrap;">"${
                data.content
              }"</p>
            </div>
          </div>
        </div>`,
    };

    MySwal.fire({
      background: "transparent",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const respuesta = await clienteAxios.post(
        "/api/sendmail",
        notificationMail
      );

      if (respuesta.status === 200) {
        MySwal.fire({
          title: (
            <Text sm black>
              Mensaje enviado con éxito.
            </Text>
          ),
          icon: "success",
          confirmButtonText: <Text white>Ok</Text>,
          confirmButtonColor: colors.black,
        });
      } else {
        MySwal.fire({
          title: (
            <Text sm black>
              Hubo un error al enviar el mensaje. Por favor comunicate a
              fmfsneakersargentina@gmail.com
            </Text>
          ),
          icon: "error",
          confirmButtonText: (
            <Text white pw="md">
              Ok
            </Text>
          ),
          confirmButtonColor: colors.black,
        });
      }
    } catch (err) {
      MySwal.fire({
        title: (
          <Text sm black>
            Hubo un error al enviar el mensaje. Por favor comunicate a
            fmfsneakersargentina@gmail.com
          </Text>
        ),
        icon: "error",
        confirmButtonText: (
          <Text white pw="md">
            Ok
          </Text>
        ),
        confirmButtonColor: colors.black,
      });
    }
  };

  return (
    <ContactContainer
      h-100
      justify="c"
      md-direction="c"
      w-100
      pw="lg"
      ph="lg"
      black
      style={{
        minHeight: "90vh",
        display: pathname === "/admin" ? "none" : "flex",
      }}
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
        <form
          className="form-container"
          onSubmit={handleSubmit(onSubmit)}
          id="contact-form"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Container justify="sb" w-100 md-direction="c">
            <Container w-40 md-w="w-100" direction="c">
              <Input
                placeholder="Nombre completo"
                ph="xs"
                white
                w-100
                border-color="white"
                spellCheck="false"
                name="name"
                ref={register({
                  required: { value: true, message: "Campo requerido " },
                })}
              />
              <Text w-100 weight="bold" red>
                {errors.name?.message}
              </Text>
            </Container>
            <Container w-40 md-w="w-100" direction="c">
              <Input
                placeholder="E-Mail"
                type="email"
                ph="xs"
                white
                w-100
                border-color="white"
                spellCheck="false"
                name="email"
                ref={register({
                  required: { value: true, message: "Campo requerido " },
                })}
              />
              <Text w-100 weight="bold" red>
                {errors.email?.message}
              </Text>
            </Container>
          </Container>
          <Container w-100 direction="c" mh="md">
            <Container w-100>
              <textarea
                placeholder="Mensaje"
                rows="10"
                cols="50"
                name="content"
                ref={register({
                  required: { value: true, message: "Campo requerido " },
                })}
                style={{
                  backgroundColor: colors.black,
                  width: "100%",
                  padding: ".5rem .5rem",
                  color: colors.white,
                  border: `1px solid ${colors.white}`,
                  borderRadius: "4px",
                  resize: "none",
                }}
              ></textarea>
            </Container>
            <Text w-100 weight="bold" red>
              {errors.content?.message}
            </Text>
          </Container>
          <Button
            form="contact-form"
            xs
            black
            ph="xs"
            mh="sm"
            pw="md"
            hover-scale="sm"
            bg="yellow"
            weight="bold"
            d-shadow="7"
            hover-shadow="1"
          >
            ENVIAR
          </Button>
        </form>
      </Container>
    </ContactContainer>
  );
};

export default Contact;
