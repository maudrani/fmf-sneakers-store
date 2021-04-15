import React from "react";
import { Container, Text, Input, Button } from "../../framework/assets";
import { useForm } from "react-hook-form";
import { colors } from "../../framework/global";
import { IsMobile, ObtainDate, ObtainTime } from "../../helpers/functions";
import { CreateSuscription } from "../admin/db/suscriptions";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Suscription = () => {
  const MySwal = withReactContent(Swal);
  const { register, errors, handleSubmit } = useForm({ mode: "onBlur" });
  const onSubmit = async (data) => {
    const notificationMail = {
      to: "fmfsneakersargentina@gmail.com",

      subject: `Nueva Suscripción!`,
      html: `<div style="max-width: 768px;">
              <div style="padding: 1rem 0;">
                <p style="font-size: 18px">
                  <strong>Tienes una nueva suscripción desde tu página.</strong
                </p>
                <span style="font-size: 11px; color: #606060;">
                  <strong style="color: #A80000;">Importante:</strong> No responder a éste correo, el mail del contacto está detallado en los Datos.
                </span>
              </div>
              <div style="margin-top: 40px;">
                <h3>Datos:</h3>   
                <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
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

      const parsedData = {
        email: data.email,
        date_created: ObtainDate(),
      };

      CreateSuscription(await parsedData);

      if (respuesta.status === 200) {
        MySwal.fire({
          title: (
            <Text sm black>
              Suscripción activada con éxito!
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
              Hubo un error al suscribirte. Por favor comunicate a
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
            Hubo un error al suscribirte. Por favor comunicate a
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
    <Container w-100 direction="c" yellow ph="xl">
      <Text xl main dark-red sm-size="md">
        Suscribete
      </Text>
      <Text
        md
        sm-size="sm"
        w-75
        secondary
        weight="light"
        ph="sm"
        style={{ textAlign: "center" }}
      >
        Y recibe todas nuestras noticias, ofertas, nuevos lanzamientos y mas!
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="suscription-form"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="E-Mail"
          md
          weight="light"
          style={{ maxWidth: IsMobile() && "18rem", marginTop: "2rem" }}
          type="email"
          name="email"
          ref={register({
            required: { value: true, message: "Campo requerido " },
          })}
        />
        <Text weight="bold" red>
          {errors.email?.message}
        </Text>
      </form>
      <Button
        bg="dark-red"
        ph="xs"
        pw="md"
        style={{ cursor: "pointer", marginTop: "2rem" }}
        hover-bg="red"
        hover-scale="sm"
        form="suscription-form"
      >
        <Text weight="regular" whitesmoke>
          SUSCRIBIRME
        </Text>
      </Button>
    </Container>
  );
};

export default Suscription;
