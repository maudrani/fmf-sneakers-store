import React, { useEffect } from "react";
import { Container, Text, Input, Img } from "../../../framework/assets";
import mercdopagoLogo from "../../../Assets/IMG/Various/mercadopago-logo.png";
import bankLogo from "../../../Assets/IMG/Various/bank_logo.png";
import styled from "styled-components";
import { colors } from "../../../framework/global";
import { useForm } from "react-hook-form";
import { UseLocalStorage } from "../../../helpers/customHooks";

const FormContainer = styled(Container)`
  .data-input {
    font-size: 18px;
    ::placeholder {
      color: ${colors["dark-gray"]};
      font-size: 15px;
    }
  }
  @media (max-width: 768px) {
    .personalDataInput {
      margin: 1rem 0;
    }

    .payment-logo-container {
      padding-top: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .payment-text-container {
      padding: 1rem 1rem;
      padding-bottom: 0rem;
      text-align: center;
    }
  }
`;

const PaymentForm = ({ onSubmit, SetIsValid }) => {
  const [formData, setFormData] = UseLocalStorage("payment-form", "");
  const { register, errors, handleSubmit } = useForm({ mode: "onBlur" });

  useEffect(() => {
    !formData && setFormData({ payment_method: "mercadopago" });
  }, [formData, setFormData]);

  const SaveFormData = (input, event) => {
    setFormData({ ...formData, [input]: event.target.value });
  };

  return (
    <FormContainer
      w-100
      direction="c"
      justify="sa"
      style={{ minHeight: "25rem" }}
    >
      <Container
        justify="fs"
        w-100
        lightest-gray
        ph="xs"
        pw="xs"
        style={{ borderBottom: `1px solid ${colors["light-gray"]}` }}
      >
        <Container
          darkest-yellow
          b-radius="circular"
          style={{ maxWidth: "2.5rem", maxHeight: "2.5rem" }}
        >
          <Text whitesmoke weight="black" pw="md" ph="md">
            2
          </Text>
        </Container>
        <Container pw="xs">
          <Text sm>Ingresar Datos</Text>
        </Container>
      </Container>

      <form id="payment-form" onSubmit={handleSubmit(onSubmit)}>
        <Container direction="c" style={{ minHeight: "25rem" }}>
          {/* Data */}
          <Container w-100 direction="c" pw="sm" ph="sm">
            <Container w-100 justify="sb" xs-direction="c">
              <Container w-47 xs-w="w-100">
                <Input
                  border-color="dark-gray"
                  w-100
                  type="text"
                  placeholder="Nombre"
                  ph="xs"
                  className="personalDataInput data-input"
                  name="name"
                  defaultValue={formData.name || ""}
                  onChange={(e) => SaveFormData("name", e) || SetIsValid(false)}
                  ref={register({
                    required: { value: true, message: "Campo requerido " },
                  })}
                  style={{ marginBottom: "1rem" }}
                />
                <Text
                  w-100
                  weight="light"
                  red
                  style={{ position: "absolute", bottom: "0" }}
                >
                  {errors.name?.message}
                </Text>
              </Container>
              <Container w-47 xs-w="w-100">
                <Input
                  border-color="dark-gray"
                  w-100
                  type="text"
                  placeholder="Apellido"
                  ph="xs"
                  className="personalDataInput data-input"
                  name="surname"
                  defaultValue={formData.surname || ""}
                  onChange={(e) =>
                    SaveFormData("surname", e) || SetIsValid(false)
                  }
                  ref={register({
                    required: { value: true, message: "Campo requerido " },
                  })}
                  style={{ marginBottom: "1rem" }}
                />
                <Text
                  w-100
                  weight="light"
                  red
                  style={{ position: "absolute", bottom: "0" }}
                >
                  {errors.surname?.message}
                </Text>
              </Container>
            </Container>

            <Container w-100 justify="sb" xs-direction="c" mh="sm">
              <Container w-47 xs-w="w-100">
                <Input
                  border-color="dark-gray"
                  type="email"
                  placeholder="E-Mail"
                  ph="xs"
                  w-100
                  className="personalDataInput data-input"
                  name="email"
                  defaultValue={formData.email || ""}
                  onChange={(e) =>
                    SaveFormData("email", e) || SetIsValid(false)
                  }
                  ref={register({
                    required: { value: true, message: "Campo requerido " },
                  })}
                  style={{ marginBottom: "1rem" }}
                />
                <Text
                  w-100
                  weight="light"
                  red
                  style={{ position: "absolute", bottom: "0" }}
                >
                  {errors.email?.message}
                </Text>
              </Container>
              <Container w-47 xs-w="w-100">
                <Input
                  border-color="dark-gray"
                  type="tel"
                  placeholder="Teléfono"
                  ph="xs"
                  w-100
                  className="personalDataInput data-input"
                  name="phone_number"
                  defaultValue={formData.phone_number || ""}
                  onChange={(e) =>
                    SaveFormData("phone_number", e) || SetIsValid(false)
                  }
                  ref={register({
                    required: { value: true, message: "Campo requerido " },
                  })}
                  style={{ marginBottom: "1rem" }}
                />
                <Text
                  w-100
                  weight="light"
                  red
                  style={{ position: "absolute", bottom: "0" }}
                >
                  {errors.phone_number?.message}
                </Text>
              </Container>
            </Container>

            <Container
              w-100
              direction="c"
              align="fs"
              className="personalDataInput data-input"
              mh="sm"
            >
              <Container w-47 xs-w="w-100" direction="c">
                <Input
                  border-color="dark-gray"
                  className="data-input"
                  type="text"
                  placeholder="Calle"
                  ph="xs"
                  w-100
                  name="street_name"
                  defaultValue={formData.street_name || ""}
                  onChange={(e) =>
                    SaveFormData("street_name", e) || SetIsValid(false)
                  }
                  ref={register({
                    required: { value: true, message: "Campo requerido " },
                  })}
                />
                <Text w-100 weight="light" red>
                  {errors.street_name?.message}
                </Text>
              </Container>
              <Container
                w-47
                justify="sb"
                sm-w="w-100"
                style={{ padding: "1rem 0" }}
              >
                <Container w-47 direction="c">
                  <Input
                    border-color="dark-gray"
                    className="data-input"
                    type="tel"
                    placeholder="Número"
                    name="street_number"
                    ph="xs"
                    w-100
                    defaultValue={formData.street_number || ""}
                    onChange={(e) =>
                      SaveFormData("street_number", e) || SetIsValid(false)
                    }
                    ref={register({
                      required: { value: true, message: "Campo requerido " },
                    })}
                  />
                  <Text w-100 weight="light" red>
                    {errors.street_number?.message}
                  </Text>
                </Container>
                <Container w-47 direction="c">
                  <Input
                    border-color="dark-gray"
                    className="data-input"
                    type="tel"
                    placeholder="Código Postal"
                    ph="xs"
                    w-100
                    name="zip_code"
                    defaultValue={formData.zip_code || ""}
                    onChange={(e) =>
                      SaveFormData("zip_code", e) || SetIsValid(false)
                    }
                    ref={register({
                      required: { value: true, message: "Campo requerido " },
                    })}
                  />
                  <Text w-100 weight="light" red>
                    {errors.zip_code?.message}
                  </Text>
                </Container>
              </Container>
            </Container>
          </Container>

          {/* Payment */}
          <Container direction="c">
            <Container
              justify="fs"
              w-100
              lightest-gray
              ph="xs"
              pw="xs"
              style={{
                borderTop: `1px solid ${colors["light-gray"]}`,
                borderBottom: `1px solid ${colors["light-gray"]}`,
              }}
            >
              <Container
                darkest-yellow
                b-radius="circular"
                style={{ maxWidth: "2.5rem", maxHeight: "2.5rem" }}
              >
                <Text whitesmoke weight="black" pw="md" ph="md">
                  3
                </Text>
              </Container>
              <Container pw="xs">
                <Text sm>Metodo de Pago</Text>
              </Container>
            </Container>

            <Container direction="c" pw="sm" ph="md">
              <Container
                white
                justify="sb"
                sm-direction="c"
                ph="sm"
                mh="xs"
                onClick={() =>
                  setFormData({ ...formData, payment_method: "mercadopago" }) ||
                  SetIsValid(false)
                }
                hover-bg="whitesmoke"
                style={{
                  cursor: "pointer",
                  border: `1px solid ${colors["lightest-gray"]}`,
                }}
                b-radius="xs"
              >
                <Container w-75 sm-w="w-100" justify="fs" xs-direction="c">
                  <Container w-15>
                    <Input
                      readOnly
                      name="mercadopago"
                      type="radio"
                      checked={
                        formData.payment_method === "mercadopago" ? true : false
                      }
                    />
                  </Container>
                  <Container
                    direction="c"
                    align="fs"
                    xs-align="c"
                    className="payment-text-container"
                  >
                    <Text sm weight="bold" sm-size="xs">
                      Mercado Pago
                    </Text>
                    <Text>
                      Pagá con todos los medios y la seguridad que brinda
                      Mercadopago.
                    </Text>
                    <Text dark-gray>Aplica un 10% de reacargo</Text>
                  </Container>
                </Container>
                <Container className="payment-logo-container" w-25 sm-w="w-50">
                  <Img src={mercdopagoLogo} />
                </Container>
              </Container>

              <Container
                white
                justify="sb"
                sm-direction="c"
                ph="sm"
                onClick={() =>
                  setFormData({
                    ...formData,
                    payment_method: "transferencia_bancaria",
                  }) || SetIsValid(false)
                }
                hover-bg="whitesmoke"
                style={{
                  cursor: "pointer",
                  border: `1px solid ${colors["lightest-gray"]}`,
                }}
                b-radius="xs"
              >
                <Container w-75 sm-w="w-100" justify="fs" xs-direction="c">
                  <Container w-15>
                    <Input
                      readOnly
                      name="transferencia_bancaria"
                      type="radio"
                      checked={
                        formData.payment_method === "transferencia_bancaria"
                          ? true
                          : false
                      }
                    />
                  </Container>
                  <Container
                    direction="c"
                    align="fs"
                    xs-align="c"
                    className="payment-text-container"
                  >
                    <Text sm weight="bold" sm-size="xs">
                      Transferencia Bancaria
                    </Text>
                    <Text>
                      Recibí nuestro CBU por mail, efectuá la transferencia, y
                      nos envias el comprobanteContainer.
                    </Text>
                  </Container>
                </Container>
                <Container className="payment-logo-container" w-25 sm-w="w-50">
                  <Img src={bankLogo} w-50 />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </form>
    </FormContainer>
  );
};

export default PaymentForm;
